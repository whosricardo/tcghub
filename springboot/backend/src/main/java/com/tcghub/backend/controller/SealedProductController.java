package com.tcghub.backend.controller;

import com.tcghub.backend.dto.PageResponse;
import com.tcghub.backend.dto.SealedProductRequest;
import com.tcghub.backend.dto.SealedProductResponse;
import com.tcghub.backend.dto.SealedProductUpdateRequest;
import com.tcghub.backend.service.SealedProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sealed-products")
@Tag(name = "Produtos Selados", description = "Endpoints para criar e buscar produtos selados")
public class SealedProductController {

    private final SealedProductService sealedProductService;

    public SealedProductController(SealedProductService sealedProductService) {
        this.sealedProductService = sealedProductService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Criar novo produto selado", description = "Adiciona um novo produto selado ao banco de dados.")
    public SealedProductResponse createSealedProduct(@Valid @RequestBody SealedProductRequest request) {
        return sealedProductService.createSealedProduct(request);
    }

    @GetMapping
    @Operation(summary = "Buscar produtos selados", description = "Retorna uma lista paginada de produtos selados.")
    public PageResponse<SealedProductResponse> findAll(
            @Parameter(description = "Filtro parcial por nome do produto") @RequestParam(required = false) String name,
            @Parameter(description = "Filtro exato pela coleção") @RequestParam(required = false) String collection,
            @Parameter(description = "Filtro pelo tipo do produto selado") @RequestParam(required = false) String sealedType,
            @Parameter(description = "Número da página (começa em 0)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Quantidade de itens por página") @RequestParam(defaultValue = "20") int size
    ) {
        return sealedProductService.findAll(name, collection, sealedType, page, size);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar produto selado por ID", description = "Retorna os detalhes de um produto selado específico.")
    public SealedProductResponse findById(
            @Parameter(description = "ID único do produto selado") @PathVariable Long id
    ) {
        return sealedProductService.findById(id);
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Atualizar descrição do produto selado", description = "Atualiza apenas a descrição de um produto selado existente.")
    public SealedProductResponse updateDescription(
            @Parameter(description = "ID único do produto selado") @PathVariable Long id,
            @Valid @RequestBody SealedProductUpdateRequest request
    ) {
        return sealedProductService.updateDescription(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Deletar produto selado", description = "Remove um produto selado do banco de dados.")
    public void deleteById(
            @Parameter(description = "ID único do produto selado") @PathVariable Long id
    ) {
        sealedProductService.deleteById(id);
    }
}