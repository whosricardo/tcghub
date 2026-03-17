package com.tcghub.backend.dto;

import com.tcghub.backend.model.enums.Treatment;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CardRequest(
        @NotBlank String name,
        @NotBlank String collection,
        @NotBlank String cardNumber,
        @NotBlank String rarity,
        @NotNull Treatment treatment,
        @NotBlank String cardType,
        Integer cost,
        Integer power,
        Integer counter,
        String combatAttribute,
        @NotBlank String colors,
        String subtypes) {
}
