package com.tcghub.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class OrderItems {
    private Long listingId;
    private Long orderId;
    private Integer quantityBought;
    private BigDecimal unitPricePaid;
    private String technicalReport;
    private LocalDateTime inspectionDate;
}