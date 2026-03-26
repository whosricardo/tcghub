package com.tcghub.backend.service;

import com.tcghub.backend.dto.CardRequest;
import com.tcghub.backend.dto.CardResponse;
import com.tcghub.backend.exception.NotFoundException;
import com.tcghub.backend.model.SingleCard;
import com.tcghub.backend.repository.SingleCardRepository;
import org.springframework.stereotype.Service;
import com.tcghub.backend.dto.PageResponse;

import java.util.List;

@Service
public class CardService {

    private final SingleCardRepository singleCardRepository;

    public CardService(SingleCardRepository singleCardRepository) {
        this.singleCardRepository = singleCardRepository;
    }

    public CardResponse createCard(CardRequest request) {
        SingleCard singleCard = new SingleCard(
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
                request.subtypes(),
                request.description());
        SingleCard saved = singleCardRepository.save(singleCard);
        return toResponse(saved);
    }

    public CardResponse findById(Long id) {
        SingleCard singleCard = singleCardRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Carta não encontrada"));
        return toResponse(singleCard);
    }

    public PageResponse<CardResponse> findAll(String name, String collection, String color, String cardType, int page,
            int size) {
        int offset = page * size;
        List<CardResponse> content = singleCardRepository.findAll(name, collection, color, cardType, offset, size)
                .stream()
                .map(this::toResponse)
                .toList();
        int totalElements = singleCardRepository.count(name, collection, color, cardType);
        int totalPages = (int) Math.ceil((double) totalElements / size);
        return new PageResponse<>(content, page, totalPages, totalElements);
    }

    private CardResponse toResponse(SingleCard singleCard) {
        return new CardResponse(
                singleCard.getId(),
                singleCard.getName(),
                singleCard.getCollection(),
                singleCard.getCardNumber(),
                singleCard.getRarity(),
                singleCard.getTreatment(),
                singleCard.getCardType(),
                singleCard.getCost(),
                singleCard.getPower(),
                singleCard.getCounter(),
                singleCard.getCombatAttribute(),
                singleCard.getColors(),
                singleCard.getSubtypes(),
                singleCard.getDescription());
    }
}
