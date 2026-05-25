// Order Types
export interface OrderResponse {
    id: number;
    buyerId: number;
    createdAt: string;
    totalAmount: number;
    status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
}

export interface OrderRequest {
    buyerId: number;
    totalAmount: number;
}

export interface OrderUpdateRequest {
    status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
}

export interface OrderCancelResponse {
    orderId: number;
    cancelled: boolean;
    message: string;
}

export interface PageResponseOrderResponse {
    content: OrderResponse[];
    currentPage: number;
    totalPages: number;
    totalElements: number;
}

// Payment Types
export interface PaymentLogResponse {
    id: number;
    paymentId: number;
    orderId: number;
    oldStatus: string;
    newStatus: string;
    changedAt: string;
}

// Function Types
export interface ShippingEligibilityResponse {
    orderId: number;
    result: string;
}

// Report Types
export interface SupplierSalesReportResponse {
    supplierId: number;
    supplierName: string;
    storeName: string;
    totalOrders: number;
    totalItemsSold: number;
    totalRevenue: number;
}

export interface PendingOrderReportResponse {
    orderId: number;
    buyerId: number;
    buyerName: string;
    createdAt: string;
    totalAmount: number;
    status: string;
}

export interface ProductWithoutListingReportResponse {
    productId: number;
    name: string;
    collection: string;
}

export interface OrdersAboveAverageReportResponse {
    orderId: number;
    buyerId: number;
    buyerName: string;
    createdAt: string;
    totalAmount: number;
    status: string;
}

// Payment & Delivery Enums
export type PaymentMethod = 'CREDIT_CARD' | 'DEBIT_CARD' | 'PIX' | 'BOLETO' | 'CASH';
export type PaymentStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'REFUNDED';
export type DeliveryStatus = 'PENDING' | 'SHIPPED' | 'IN_TRANSIT' | 'DELIVERED' | 'RETURNED' | 'CANCELLED';

// Order Item DTOs
export interface OrderItemRequest {
    listingId: number;
    orderId: number;
    quantityBought: number;
    unitPricePaid: number;
    technicalReport?: string;
    inspectionDate?: string;
}

export interface OrderItemResponse {
    listingId: number;
    orderId: number;
    quantityBought: number;
    unitPricePaid: number;
    technicalReport?: string;
    inspectionDate?: string;
}

// Payment DTOs
export interface PaymentRequest {
    paymentMethod: PaymentMethod;
    amountPaid: number;
    orderId: number;
}

export interface PaymentResponse {
    id: number;
    paymentDateTime: string;
    paymentMethod: PaymentMethod;
    status: PaymentStatus;
    amountPaid: number;
    orderId: number;
}

// Shipment DTOs
export interface ShipmentRequest {
    trackingCode?: string;
    freightCost: number;
    carrier: string;
    estimatedDeliveryDate?: string;
    orderId: number;
    addressId?: number;
}

export interface ShipmentResponse {
    id: number;
    trackingCode?: string;
    shippingDate?: string;
    freightCost: number;
    carrier: string;
    deliveryStatus: DeliveryStatus;
    estimatedDeliveryDate?: string;
    orderId: number;
    addressId?: number;
}

