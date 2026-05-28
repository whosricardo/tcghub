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

export interface PaymentUpdateRequest {
    status: PaymentStatus;
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

// Listing Types
export interface ListingRequest {
    availableQuantity: number;
    currentPrice: number;
    itemCondition: string;
    productLanguage: string;
    productId: number;
    supplierId: number;
}

export interface ListingResponse {
    id: number;
    availableQuantity: number;
    currentPrice: number;
    itemCondition: string;
    productLanguage: string;
    productId: number;
    supplierId: number;
}

export interface ListingUpdateRequest {
    availableQuantity?: number;
    currentPrice?: number;
    itemCondition?: string;
    productLanguage?: string;
}

export interface PageResponseListingResponse {
    content: ListingResponse[];
    currentPage: number;
    totalPages: number;
    totalElements: number;
}

// View SQL Types (Etapa 04)
export interface ActiveListingDetailViewResponse {
    listingId: number;
    productName: string;
    collection: string;
    supplierName: string;
    commissionRate: number;
    currentPrice: number;
    availableQuantity: number;
    itemCondition: string;
    productLanguage: string;
}

export interface AboveAvgCommissionSupplierViewResponse {
    supplierId: number;
    storeName: string;
    contactEmail: string;
    commissionRate: number;
    totalProductsListed: number;
}

// Dashboard Types
export interface DashboardSummaryResponse {
    totalOrders: number;
    totalApprovedPayments: number;
    totalRevenue: number;
    averageTicket: number;
    totalSuppliersWithSales: number;
    totalProductsWithoutListings: number;
}

export interface SalesTrendPointResponse {
    label: string;
    totalRevenue: number;
}

export interface OrderStatusDistributionResponse {
    status: string;
    total: number;
}

export interface TopSupplierDashboardResponse {
    supplierId: number;
    supplierName: string;
    storeName: string;
    totalRevenue: number;
    totalItemsSold: number;
}

export interface PaymentMethodDistributionResponse {
    paymentMethod: string;
    total: number;
}

export interface OrderValueRangeResponse {
    rangeLabel: string;
    totalOrders: number;
}

export interface OrderStatisticsResponse {
    average: number;
    median: number;
    mode: number;
    variance: number;
    standardDeviation: number;
}

export interface DashboardFilters {
    startDate?: string;
    endDate?: string;
    groupBy?: 'day' | 'month';
    status?: string;
    collection?: string;
    limit?: number;
    paymentStatus?: string;
}
