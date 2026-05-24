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
