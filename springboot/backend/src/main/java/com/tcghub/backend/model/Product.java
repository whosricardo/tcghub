package com.tcghub.backend.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public abstract class Product {
    private Long id;
    private String name;
    private String collection;

    protected Product(Long id, String name, String collection) {
        this.id = id;
        this.name = name;
        this.collection = collection;
    }
}