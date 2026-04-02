package com.tcghub.backend.controller;

import com.tcghub.backend.dto.ListingRequest;
import com.tcghub.backend.dto.ListingResponse;
import com.tcghub.backend.dto.ListingUpdateRequest;
import com.tcghub.backend.dto.PageResponse;
import com.tcghub.backend.service.ListingService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/listings")
@Tag(name = "Anúncios", description = "Endpoints para gerenciamento de anúncios/ofertas do marketplace")
public class ListingController {

    private final ListingService listingService;

    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Criar anúncio", description = "Cria um novo anúncio/oferta para um produto existente vinculado a um fornecedor existente.")
    public ListingResponse create(
            @Valid @RequestBody ListingRequest request) {
        return listingService.create(request);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar anúncio por ID", description = "Retorna os detalhes de um anúncio específico com base no seu ID.")
    public ListingResponse findById(
            @Parameter(description = "ID único do anúncio") @PathVariable Long id) {
        return listingService.findById(id);
    }

    @GetMapping
    @Operation(summary = "Listar anúncios", description = "Retorna uma lista paginada de anúncios cadastrados.")
    public PageResponse<ListingResponse> findAll(
            @Parameter(description = "Número da página (começa em 0)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Quantidade de itens por página") @RequestParam(defaultValue = "20") int size) {
        return listingService.findAll(page, size);
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Atualizar anúncio", description = "Atualiza parcialmente os dados editáveis de um anúncio existente.")
    public ListingResponse update(
            @Parameter(description = "ID único do anúncio") @PathVariable Long id,
            @Valid @RequestBody ListingUpdateRequest request) {
        return listingService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Deletar anúncio", description = "Remove um anúncio do banco de dados.")
    public void deleteById(
            @Parameter(description = "ID único do anúncio") @PathVariable Long id) {
        listingService.deleteById(id);
    }
}
