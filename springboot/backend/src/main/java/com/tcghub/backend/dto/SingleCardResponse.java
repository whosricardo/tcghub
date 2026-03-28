package com.tcghub.backend.dto;

import com.tcghub.backend.model.enums.Treatment;

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
        String colors,
        String subtypes,
        String description) {
}
