package com.tcghub.backend.controller;

import com.tcghub.backend.dto.PageResponse;
import com.tcghub.backend.dto.ShipmentRequest;
import com.tcghub.backend.dto.ShipmentResponse;
import com.tcghub.backend.dto.ShipmentUpdateRequest;
import com.tcghub.backend.service.ShipmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/shipments")
@Tag(
    name = "Remessas",
    description = "Endpoints para gerenciamento de remessas/envios"
)
public class ShipmentController {

    private final ShipmentService shipmentService;

    public ShipmentController(ShipmentService shipmentService) {
        this.shipmentService = shipmentService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(
        summary = "Criar remessa",
        description = "Cria uma nova remessa vinculada a um pedido existente."
    )
    public ShipmentResponse create(
        @Valid @RequestBody ShipmentRequest request
    ) {
        return shipmentService.create(request);
    }

    @GetMapping("/{id}")
    @Operation(
        summary = "Buscar remessa por ID",
        description = "Retorna os detalhes de uma remessa específica com base no seu ID."
    )
    public ShipmentResponse findById(
        @Parameter(description = "ID único da remessa") @PathVariable Long id
    ) {
        return shipmentService.findById(id);
    }

    @GetMapping
    @Operation(
        summary = "Listar remessas",
        description = "Retorna uma lista paginada de remessas cadastradas."
    )
    public PageResponse<ShipmentResponse> findAll(
        @Parameter(
            description = "Número da página (começa em 0)"
        ) @RequestParam(defaultValue = "0") int page,
        @Parameter(
            description = "Quantidade de itens por página"
        ) @RequestParam(defaultValue = "20") int size
    ) {
        return shipmentService.findAll(page, size);
    }

    @PatchMapping("/{id}")
    @Operation(
        summary = "Atualizar status da remessa",
        description = "Atualiza o status de uma remessa existente."
    )
    public ShipmentResponse updateStatus(
        @Parameter(description = "ID único da remessa") @PathVariable Long id,
        @Valid @RequestBody ShipmentUpdateRequest request
    ) {
        return shipmentService.updateStatus(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(
        summary = "Deletar remessa",
        description = "Remove uma remessa do banco de dados."
    )
    public void deleteById(
        @Parameter(description = "ID único da remessa") @PathVariable Long id
    ) {
        shipmentService.deleteById(id);
    }
}
