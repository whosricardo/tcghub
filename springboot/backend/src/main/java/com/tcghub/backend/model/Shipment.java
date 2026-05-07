package com.tcghub.backend.model;

import com.tcghub.backend.model.enums.DeliveryStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Shipment {

    private Long id;
    private String trackingCode;
    private LocalDateTime shippingDate;
    private BigDecimal freightCost;
    private String carrier;
    private DeliveryStatus deliveryStatus;
    private LocalDateTime estimatedDeliveryDate;
    private Long orderId;
    private Long addressId;
}
