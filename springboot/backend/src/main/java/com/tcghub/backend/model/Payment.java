package com.tcghub.backend.model;

import com.tcghub.backend.model.enums.PaymentMethod;
import com.tcghub.backend.model.enums.PaymentStatus;
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
public class Payment {

    private Long id;
    private LocalDateTime paymentDateTime;
    private PaymentMethod paymentMethod;
    private PaymentStatus status;
    private BigDecimal amountPaid;
    private Long orderId;
}
