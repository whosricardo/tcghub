package com.tcghub.backend.service;

import com.tcghub.backend.dto.PageResponse;
import com.tcghub.backend.dto.PaymentRequest;
import com.tcghub.backend.dto.PaymentResponse;
import com.tcghub.backend.dto.PaymentUpdateRequest;
import com.tcghub.backend.exception.NotFoundException;
import com.tcghub.backend.model.Payment;
import com.tcghub.backend.model.enums.PaymentStatus;
import com.tcghub.backend.repository.OrderRepository;
import com.tcghub.backend.repository.PaymentRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    public PaymentService(
        PaymentRepository paymentRepository,
        OrderRepository orderRepository
    ) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
    }

    @Transactional
    public PaymentResponse create(PaymentRequest request) {
        orderRepository
            .findById(request.orderId())
            .orElseThrow(() -> new NotFoundException("Pedido não encontrado"));

        Payment payment = new Payment(
            null,
            LocalDateTime.now(),
            request.paymentMethod(),
            PaymentStatus.PENDING,
            request.amountPaid(),
            request.orderId()
        );

        Payment saved = paymentRepository.save(payment);
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public PaymentResponse findById(Long id) {
        Payment payment = paymentRepository
            .findById(id)
            .orElseThrow(() ->
                new NotFoundException("Pagamento não encontrado")
            );

        return toResponse(payment);
    }

    @Transactional(readOnly = true)
    public PageResponse<PaymentResponse> findAll(int page, int size) {
        int offset = page * size;

        List<PaymentResponse> content = paymentRepository
            .findAll(offset, size)
            .stream()
            .map(this::toResponse)
            .toList();

        int totalElements = paymentRepository.count();
        int totalPages = (int) Math.ceil((double) totalElements / size);

        return new PageResponse<>(content, page, totalPages, totalElements);
    }

    @Transactional
    public PaymentResponse updateStatus(Long id, PaymentUpdateRequest request) {
        paymentRepository
            .findById(id)
            .orElseThrow(() ->
                new NotFoundException("Pagamento não encontrado")
            );

        paymentRepository.updateStatus(id, request.status());

        Payment updated = paymentRepository
            .findById(id)
            .orElseThrow(() ->
                new NotFoundException("Pagamento não encontrado")
            );

        return toResponse(updated);
    }

    @Transactional
    public void deleteById(Long id) {
        paymentRepository
            .findById(id)
            .orElseThrow(() ->
                new NotFoundException("Pagamento não encontrado")
            );

        paymentRepository.deleteById(id);
    }

    private PaymentResponse toResponse(Payment payment) {
        return new PaymentResponse(
            payment.getId(),
            payment.getPaymentDateTime(),
            payment.getPaymentMethod(),
            payment.getStatus(),
            payment.getAmountPaid(),
            payment.getOrderId()
        );
    }
}
