package com.tcghub.backend.controller;

import com.tcghub.backend.dto.OrderRequest;
import com.tcghub.backend.dto.OrderResponse;
import com.tcghub.backend.dto.OrderUpdateRequest;
import com.tcghub.backend.dto.PageResponse;
import com.tcghub.backend.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@Tag(name = "Pedidos", description = "Endpoints para gerenciamento de pedidos")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(
        summary = "Criar pedido",
        description = "Cria um novo pedido para um comprador existente."
    )
    public OrderResponse create(@Valid @RequestBody OrderRequest request) {
        return orderService.create(request);
    }

    @GetMapping("/{id}")
    @Operation(
        summary = "Buscar pedido por ID",
        description = "Retorna os detalhes de um pedido específico com base no seu ID."
    )
    public OrderResponse findById(
        @Parameter(description = "ID único do pedido") @PathVariable Long id
    ) {
        return orderService.findById(id);
    }

    @GetMapping
    @Operation(
        summary = "Listar pedidos",
        description = "Retorna uma lista paginada de pedidos cadastrados."
    )
    public PageResponse<OrderResponse> findAll(
        @Parameter(
            description = "Número da página (começa em 0)"
        ) @RequestParam(defaultValue = "0") int page,
        @Parameter(
            description = "Quantidade de itens por página"
        ) @RequestParam(defaultValue = "20") int size
    ) {
        return orderService.findAll(page, size);
    }

    @PatchMapping("/{id}")
    @Operation(
        summary = "Atualizar status do pedido",
        description = "Atualiza o status de um pedido existente."
    )
    public OrderResponse updateStatus(
        @Parameter(description = "ID único do pedido") @PathVariable Long id,
        @Valid @RequestBody OrderUpdateRequest request
    ) {
        return orderService.updateStatus(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(
        summary = "Deletar pedido",
        description = "Remove um pedido do banco de dados."
    )
    public void deleteById(
        @Parameter(description = "ID único do pedido") @PathVariable Long id
    ) {
        orderService.deleteById(id);
    }
}
