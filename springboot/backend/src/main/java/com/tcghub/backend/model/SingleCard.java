package com.tcghub.backend.model;

import com.tcghub.backend.model.enums.Treatment;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class SingleCard extends Product {

    private String cardNumber;
    private String rarity;
    private Treatment treatment;
    private String cardType;
    private Integer cost;
    private Integer power;
    private Integer counter;
    private String combatAttribute;
    private List<String> colors;
    private List<String> subtypes;
    private String description;

    public SingleCard(
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
        super(id, name, collection);
        this.cardNumber = cardNumber;
        this.rarity = rarity;
        this.treatment = treatment;
        this.cardType = cardType;
        this.cost = cost;
        this.power = power;
        this.counter = counter;
        this.combatAttribute = combatAttribute;
        this.colors = colors;
        this.subtypes = subtypes;
        this.description = description;
    }
}