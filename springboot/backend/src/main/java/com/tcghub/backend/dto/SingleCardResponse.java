package com.tcghub.backend.dto;

import com.tcghub.backend.model.enums.Treatment;

import java.util.List;

public record SingleCardResponse(
        Long id,
        String name,
        String collection,
        String cardNumber,
        String rarity,
        Treatment treatment,
        String cardType,
        Integer cost,
        Integer power,
        Integer counter,
        String combatAttribute,
        List<String> colors,
        List<String> subtypes,
        String description
) {
}