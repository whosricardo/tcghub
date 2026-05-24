package com.tcghub.backend.service;

import com.tcghub.backend.dto.logs.PaymentLogResponse;
import com.tcghub.backend.repository.PaymentLogRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentLogService {

    private final PaymentLogRepository paymentLogRepository;

    public PaymentLogService(PaymentLogRepository paymentLogRepository) {
        this.paymentLogRepository = paymentLogRepository;
    }

    @Transactional(readOnly = true)
    public List<PaymentLogResponse> findAll() {
        return paymentLogRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<PaymentLogResponse> findByPaymentId(Long paymentId) {
        return paymentLogRepository.findByPaymentId(paymentId);
    }
}
