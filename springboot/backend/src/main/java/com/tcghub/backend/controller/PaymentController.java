package com.tcghub.backend.controller;

import com.tcghub.backend.dto.PageResponse;
import com.tcghub.backend.dto.PaymentRequest;
import com.tcghub.backend.dto.PaymentResponse;
import com.tcghub.backend.dto.PaymentUpdateRequest;
import com.tcghub.backend.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@Tag(
    name = "Pagamentos",
    description = "Endpoints para gerenciamento de pagamentos"
)
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(
        summary = "Criar pagamento",
        description = "Cria um novo pagamento vinculado a um pedido existente."
    )
    public PaymentResponse create(@Valid @RequestBody PaymentRequest request) {
        return paymentService.create(request);
    }

    @GetMapping("/{id}")
    @Operation(
        summary = "Buscar pagamento por ID",
        description = "Retorna os detalhes de um pagamento específico com base no seu ID."
    )
    public PaymentResponse findById(
        @Parameter(description = "ID único do pagamento") @PathVariable Long id
    ) {
        return paymentService.findById(id);
    }

    @GetMapping
    @Operation(
        summary = "Listar pagamentos",
        description = "Retorna uma lista paginada de pagamentos cadastrados."
    )
    public PageResponse<PaymentResponse> findAll(
        @Parameter(
            description = "Número da página (começa em 0)"
        ) @RequestParam(defaultValue = "0") int page,
        @Parameter(
            description = "Quantidade de itens por página"
        ) @RequestParam(defaultValue = "20") int size
    ) {
        return paymentService.findAll(page, size);
    }

    @PatchMapping("/{id}")
    @Operation(
        summary = "Atualizar status do pagamento",
        description = "Atualiza o status de um pagamento existente."
    )
    public PaymentResponse updateStatus(
        @Parameter(description = "ID único do pagamento") @PathVariable Long id,
        @Valid @RequestBody PaymentUpdateRequest request
    ) {
        return paymentService.updateStatus(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(
        summary = "Deletar pagamento",
        description = "Remove um pagamento do banco de dados."
    )
    public void deleteById(
        @Parameter(description = "ID único do pagamento") @PathVariable Long id
    ) {
        paymentService.deleteById(id);
    }
}
