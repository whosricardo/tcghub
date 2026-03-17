package com.tcghub.backend.service;

import com.tcghub.backend.dto.CardRequest;
import com.tcghub.backend.dto.CardResponse;
import com.tcghub.backend.exception.NotFoundException;
import com.tcghub.backend.model.Card;
import com.tcghub.backend.repository.CardRepository;
import org.springframework.stereotype.Service;
import com.tcghub.backend.dto.PageResponse;

import java.util.List;

@Service
public class CardService {

    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public CardResponse createCard(CardRequest request) {
        Card card = new Card(
                null,
                request.name(),
                request.collection(),
                request.cardNumber(),
                request.rarity(),
                request.treatment(),
                request.cardType(),
                request.cost(),
                request.power(),
                request.counter(),
                request.combatAttribute(),
                request.colors(),
                request.subtypes());
        Card saved = cardRepository.save(card);
        return toResponse(saved);
    }

    public CardResponse findById(Long id) {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Carta não encontrada"));
        return toResponse(card);
    }

    public PageResponse<CardResponse> findAll(String name, String collection, String color, String cardType, int page,
            int size) {
        int offset = page * size;
        List<CardResponse> content = cardRepository.findAll(name, collection, color, cardType, offset, size)
                .stream()
                .map(this::toResponse)
                .toList();
        int totalElements = cardRepository.count(name, collection, color, cardType);
        int totalPages = (int) Math.ceil((double) totalElements / size);
        return new PageResponse<>(content, page, totalPages, totalElements);
    }

    private CardResponse toResponse(Card card) {
        return new CardResponse(
                card.getId(),
                card.getName(),
                card.getCollection(),
                card.getCardNumber(),
                card.getRarity(),
                card.getTreatment(),
                card.getCardType(),
                card.getCost(),
                card.getPower(),
                card.getCounter(),
                card.getCombatAttribute(),
                card.getColors(),
                card.getSubtypes());
    }
}
