package com.tcghub.backend.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SealedProduct extends Product {
    private String sealedType;
    private String description;

    public SealedProduct(Long id, String name, String collection, String sealedType, String description) {
        super(id, name, collection);
        this.sealedType = sealedType;
        this.description = description;
    }
}
