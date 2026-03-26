package com.tcghub.backend.service;

import com.tcghub.backend.dto.SingleCardRequest;
import com.tcghub.backend.dto.SingleCardResponse;
import com.tcghub.backend.exception.NotFoundException;
import com.tcghub.backend.model.SingleCard;
import com.tcghub.backend.repository.SingleCardRepository;
import org.springframework.stereotype.Service;
import com.tcghub.backend.dto.PageResponse;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SingleCardService {

    private final SingleCardRepository singleCardRepository;

    public SingleCardService(SingleCardRepository singleCardRepository) {
        this.singleCardRepository = singleCardRepository;
    }

    @Transactional
    public SingleCardResponse createCard(SingleCardRequest request) {
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

    @Transactional(readOnly = true)
    public SingleCardResponse findById(Long id) {
        SingleCard singleCard = singleCardRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Carta não encontrada"));
        return toResponse(singleCard);
    }

    @Transactional(readOnly = true)
    public PageResponse<SingleCardResponse> findAll(String name, String collection, String color, String cardType, int page,
                                                    int size) {
        int offset = page * size;
        List<SingleCardResponse> content = singleCardRepository.findAll(name, collection, color, cardType, offset, size)
                .stream()
                .map(this::toResponse)
                .toList();
        int totalElements = singleCardRepository.count(name, collection, color, cardType);
        int totalPages = (int) Math.ceil((double) totalElements / size);
        return new PageResponse<>(content, page, totalPages, totalElements);
    }

    private SingleCardResponse toResponse(SingleCard singleCard) {
        return new SingleCardResponse(
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
