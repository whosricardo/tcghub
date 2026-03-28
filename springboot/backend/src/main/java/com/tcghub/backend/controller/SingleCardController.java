package com.tcghub.backend.controller;

import com.tcghub.backend.dto.SingleCardRequest;
import com.tcghub.backend.dto.SingleCardResponse;
import com.tcghub.backend.dto.PageResponse;
import com.tcghub.backend.dto.SingleCardUpdateRequest;
import com.tcghub.backend.service.SingleCardService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/single-cards")
@Tag(name = "Cartas", description = "Endpoints para criar e buscar cartas do TCG")
public class SingleCardController {

    private final SingleCardService singleCardService;

    @Autowired
    public SingleCardController(SingleCardService singleCardService) {
        this.singleCardService = singleCardService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Criar nova carta", description = "Adiciona uma nova carta ao banco de dados.")
    public SingleCardResponse createCard(@Valid @RequestBody SingleCardRequest request) {
        return singleCardService.createCard(request);
    }

    @GetMapping
    @Operation(summary = "Buscar cartas", description = "Retorna uma lista paginada de cartas. Permite filtragem por nome, coleção, cor e tipo.")
    public PageResponse<SingleCardResponse> findAll(
            @Parameter(description = "Filtro parcial por nome da carta") @RequestParam(required = false) String name,
            @Parameter(description = "Filtro exato pela coleção") @RequestParam(required = false) String collection,
            @Parameter(description = "Filtro pela cor da carta") @RequestParam(required = false) String color,
            @Parameter(description = "Filtro pelo tipo de carta (ex: Criatura, Feitiço)") @RequestParam(required = false) String cardType,
            @Parameter(description = "Número da página (começa em 0)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Quantidade de itens por página") @RequestParam(defaultValue = "20") int size) {
        return singleCardService.findAll(name, collection, color, cardType, page, size);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar carta por ID", description = "Retorna os detalhes de uma carta específica baseada no seu ID.")
    public SingleCardResponse findById(@Parameter(description = "ID único da carta") @PathVariable Long id) {
        return singleCardService.findById(id);
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Atualizar descrição da carta", description = "Atualiza apenas a descrição de uma carta existente.")
    public SingleCardResponse updateDescription(
            @Parameter(description = "ID único da carta") @PathVariable Long id,
            @Valid @RequestBody SingleCardUpdateRequest request) {
        return singleCardService.updateDescription(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Deletar carta", description = "Remove uma carta do banco de dados.")
    public void deleteById(@Parameter(description = "ID único da carta") @PathVariable Long id) {
        singleCardService.deleteById(id);
    }
}
