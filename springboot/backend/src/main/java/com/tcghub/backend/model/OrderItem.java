package com.tcghub.backend.model;

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
public class OrderItem {

    private Long listingId;
    private Long orderId;
    private Integer quantityBought;
    private BigDecimal unitPricePaid;
    private String technicalReport;
    private LocalDateTime inspectionDate;
}
