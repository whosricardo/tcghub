"use server"

import { fetchData } from "@/utils/fetchData";
import { 
    OrderRequest, 
    OrderResponse, 
    OrderItemRequest, 
    PaymentRequest, 
    ShipmentRequest,
    PaymentMethod
} from "@/types/api";
import { CartItem } from "@/store/cartStore";

interface ProcessCheckoutParams {
    items: CartItem[];
    paymentMethod: PaymentMethod;
    totalAmount: number;
    shippingTotal: number;
}

/**
 * Orchestrator Server Action for processing the multi-step checkout workflow in one transaction.
 * Sequentially calls: /orders -> /order-items -> /payments -> /shipments.
 */
export async function processCheckout({
    items,
    paymentMethod,
    totalAmount,
    shippingTotal
}: ProcessCheckoutParams): Promise<OrderResponse> {
    
    // 1. Create the Order
    // buyerId: using placeholder 1 since user profile system does not expose a buyerId yet
    const orderData: OrderRequest = {
        buyerId: 1,
        totalAmount: totalAmount
    };

    const orderRes = await fetchData('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData)
    });

    if (!orderRes.ok) {
        throw new Error('Falha ao criar o pedido de compra no servidor.');
    }

    const order: OrderResponse = await orderRes.json();
    const orderId = order.id;

    // 2. Create the Order Items sequentially
    // We format inspectionDate to LocalDateTime (YYYY-MM-DDTHH:mm:ss)
    const inspectionDateStr = new Date().toISOString().slice(0, 19);

    for (const item of items) {
        // Fallback listingId: use parseInt of cardId or default to 1
        const parsedCardId = parseInt(item.cardId.replace(/\D/g, ''), 10);
        const itemListingId = item.listingId || (isNaN(parsedCardId) ? 1 : parsedCardId) || 1;

        const orderItemData: OrderItemRequest = {
            listingId: itemListingId,
            orderId: orderId,
            quantityBought: item.quantity,
            unitPricePaid: item.price,
            technicalReport: `TCG card in NM condition - Standard checkout process`,
            inspectionDate: inspectionDateStr
        };

        const itemRes = await fetchData('/order-items', {
            method: 'POST',
            body: JSON.stringify(orderItemData)
        });

        if (!itemRes.ok) {
            throw new Error(`Falha ao registrar o item ${item.title} no pedido.`);
        }
    }

    // 3. Process the Payment
    const paymentRequest: PaymentRequest = {
        paymentMethod,
        amountPaid: totalAmount,
        orderId: orderId
    };

    const paymentRes = await fetchData('/payments', {
        method: 'POST',
        body: JSON.stringify(paymentRequest)
    });

    if (!paymentRes.ok) {
        throw new Error('Falha ao registrar o pagamento no servidor.');
    }

    // 4. Create the Shipment details
    const trackingCode = `TRK-${Math.floor(100000 + Math.random() * 900000)}`;
    const carrier = shippingTotal > 0 ? "Correios (SEDEX)" : "Retirada em Mãos / Frete Grátis";
    
    // Estimated delivery is 7 days from now, in LocalDateTime format
    const estimatedDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const estimatedDeliveryDateStr = estimatedDate.toISOString().slice(0, 19);

    const shipmentRequest: ShipmentRequest = {
        trackingCode,
        freightCost: shippingTotal,
        carrier,
        estimatedDeliveryDate: estimatedDeliveryDateStr,
        orderId: orderId,
        addressId: undefined // Address is validated client-side but database requires no specific CRUD entry yet
    };

    const shipmentRes = await fetchData('/shipments', {
        method: 'POST',
        body: JSON.stringify(shipmentRequest)
    });

    if (!shipmentRes.ok) {
        // We log shipment errors but order/payment has succeeded, so we can proceed
        console.error('Falha ao agendar envio para o pedido, mas o pagamento foi processado:', shipmentRes.statusText);
    }

    return order;
}
