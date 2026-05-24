package com.tcghub.backend.controller;

import com.tcghub.backend.dto.logs.PaymentLogResponse;
import com.tcghub.backend.service.PaymentLogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/logs/payments")
@Tag(name = "Logs de Pagamentos", description = "Endpoints para visualização dos logs gerados pelo trigger de pagamentos")
public class PaymentLogController {

    private final PaymentLogService paymentLogService;

    public PaymentLogController(PaymentLogService paymentLogService) {
        this.paymentLogService = paymentLogService;
    }

    @GetMapping
    @Operation(
        summary = "Listar logs de pagamentos",
        description = "Retorna os registros da tabela payment_logs gerados pelo trigger trg_log_payment_status_update."
    )
    public List<PaymentLogResponse> findAll() {
        return paymentLogService.findAll();
    }

    @GetMapping("/{paymentId}")
    @Operation(
        summary = "Listar logs por pagamento",
        description = "Retorna os registros da tabela payment_logs associados a um pagamento específico."
    )
    public List<PaymentLogResponse> findByPaymentId(
        @Parameter(description = "ID único do pagamento") @PathVariable Long paymentId
    ) {
        return paymentLogService.findByPaymentId(paymentId);
    }
}
