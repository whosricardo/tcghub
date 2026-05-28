package com.tcghub.backend.controller;

import com.tcghub.backend.dto.OrderItemRequest;
import com.tcghub.backend.dto.OrderItemResponse;
import com.tcghub.backend.dto.OrderItemUpdateRequest;
import com.tcghub.backend.dto.PageResponse;
import com.tcghub.backend.service.OrderItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order-items")
@Tag(
    name = "Itens do Pedido",
    description = "Endpoints para gerenciamento dos itens de um pedido"
)
public class OrderItemController {

    private final OrderItemService orderItemService;

    public OrderItemController(OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(
        summary = "Criar item do pedido",
        description = "Cria um novo item vinculando um anúncio existente a um pedido existente."
    )
    public OrderItemResponse create(
        @Valid @RequestBody OrderItemRequest request
    ) {
        return orderItemService.create(request);
    }

    @GetMapping("/{listingId}/{orderId}")
    @Operation(
        summary = "Buscar item do pedido",
        description = "Retorna os detalhes de um item específico do pedido com base no listingId e orderId."
    )
    public OrderItemResponse findById(
        @Parameter(description = "ID do anúncio") @PathVariable Long listingId,
        @Parameter(description = "ID do pedido") @PathVariable Long orderId
    ) {
        return orderItemService.findById(listingId, orderId);
    }

    @GetMapping
    @Operation(
        summary = "Listar itens do pedido",
        description = "Retorna uma lista paginada de itens de pedidos cadastrados."
    )
    public PageResponse<OrderItemResponse> findAll(
        @Parameter(
            description = "Número da página (começa em 0)"
        ) @RequestParam(defaultValue = "0") int page,
        @Parameter(
            description = "Quantidade de itens por página"
        ) @RequestParam(defaultValue = "20") int size
    ) {
        return orderItemService.findAll(page, size);
    }

    @PatchMapping("/{listingId}/{orderId}")
    @Operation(
        summary = "Atualizar laudo técnico do item do pedido",
        description = "Atualiza apenas o laudo técnico de um item de pedido existente."
    )
    public OrderItemResponse updateTechnicalReport(
        @Parameter(description = "ID do anúncio") @PathVariable Long listingId,
        @Parameter(description = "ID do pedido") @PathVariable Long orderId,
        @Valid @RequestBody OrderItemUpdateRequest request
    ) {
        return orderItemService.updateTechnicalReport(
            listingId,
            orderId,
            request
        );
    }

    @DeleteMapping("/{listingId}/{orderId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(
        summary = "Deletar item do pedido",
        description = "Remove um item do pedido do banco de dados."
    )
    public void deleteById(
        @Parameter(description = "ID do anúncio") @PathVariable Long listingId,
        @Parameter(description = "ID do pedido") @PathVariable Long orderId
    ) {
        orderItemService.deleteById(listingId, orderId);
    }
}
