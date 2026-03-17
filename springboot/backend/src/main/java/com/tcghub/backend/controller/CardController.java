package com.tcghub.backend.controller;

import com.tcghub.backend.dto.CardRequest;
import com.tcghub.backend.dto.CardResponse;
import com.tcghub.backend.dto.PageResponse;
import com.tcghub.backend.service.CardService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cards")
public class CardController {

    private final CardService cardService;

    @Autowired
    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CardResponse createCard(@Valid @RequestBody CardRequest request) {
        return cardService.createCard(request);
    }

    @GetMapping
    public PageResponse<CardResponse> findAll(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String collection,
            @RequestParam(required = false) String color,
            @RequestParam(required = false) String cardType,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return cardService.findAll(name, collection, color, cardType, page, size);
    }

    @GetMapping("/{id}")
    public CardResponse findById(@PathVariable Long id) {
        return cardService.findById(id);
    }
}
