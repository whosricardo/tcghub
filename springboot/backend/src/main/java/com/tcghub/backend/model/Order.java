package com.tcghub.backend.model;

import com.tcghub.backend.model.enums.OrderStatus;
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
public class Order {

    private Long id;
    private Long buyerId;
    private LocalDateTime createdAt;
    private BigDecimal totalAmount;
    private OrderStatus status;
}
