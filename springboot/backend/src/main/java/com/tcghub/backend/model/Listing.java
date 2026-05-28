package com.tcghub.backend.model;

import java.math.BigDecimal;

public class Listing {
    private Long id;
    private Integer availableQuantity;
    private BigDecimal currentPrice;
    private String itemCondition;
    private String productLanguage;
    private Long productId;
    private Long supplierId;

    public Listing() {
    }

    public Listing(
            Long id,
            Integer availableQuantity,
            BigDecimal currentPrice,
            String itemCondition,
            String productLanguage,
            Long productId,
            Long supplierId) {
        this.id = id;
        this.availableQuantity = availableQuantity;
        this.currentPrice = currentPrice;
        this.itemCondition = itemCondition;
        this.productLanguage = productLanguage;
        this.productId = productId;
        this.supplierId = supplierId;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAvailableQuantity() {
        return this.availableQuantity;
    }

    public void setAvailableQuantity(Integer availableQuantity) {
        this.availableQuantity = availableQuantity;
    }

    public BigDecimal getCurrentPrice() {
        return this.currentPrice;
    }

    public void setCurrentPrice(BigDecimal currentPrice) {
        this.currentPrice = currentPrice;
    }

    public String getItemCondition() {
        return this.itemCondition;
    }

    public void setItemCondition(String itemCondition) {
        this.itemCondition = itemCondition;
    }

    public String getProductLanguage() {
        return this.productLanguage;
    }

    public void setProductLanguage(String productLanguage) {
        this.productLanguage = productLanguage;
    }

    public Long getProductId() {
        return this.productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getSupplierId() {
        return this.supplierId;
    }

    public void setSupplierId(Long supplierId) {
        this.supplierId = supplierId;
    }
}
