package com.tcghub.backend.model;

import com.tcghub.backend.model.enums.Treatment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Card {
    private Long id;
    private String name;
    private String collection;
    private String cardNumber;
    private String rarity;
    private Treatment treatment;
    private String cardType;
    private Integer cost;
    private Integer power;
    private Integer counter;
    private String combatAttribute;
    private String colors;
    private String subtypes;
    private String description;
}
