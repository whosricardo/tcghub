package com.tcghub.backend.dto;

import com.tcghub.backend.model.enums.Treatment;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record SingleCardRequest(
        @NotBlank String name,
        @NotBlank String collection,
        @NotBlank String cardNumber,
        @NotBlank String rarity,
        Treatment treatment,
        @NotBlank String cardType,
        Integer cost,
        Integer power,
        Integer counter,
        String combatAttribute,
        @NotEmpty List<String> colors,
        List<String> subtypes,
        String description
) {
}