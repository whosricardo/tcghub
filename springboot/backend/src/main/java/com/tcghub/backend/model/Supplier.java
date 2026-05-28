package com.tcghub.backend.model;

import java.math.BigDecimal;

public class Supplier {
    private Long userId;
    private String cnpj;
    private String storeName;
    private String contactEmail;
    private BigDecimal commissionRate;

    // Constructors
    public Supplier() {
    }

    public Supplier(Long userId, String cnpj, String storeName, String contactEmail, BigDecimal commissionRate) {
        this.userId = userId;
        this.cnpj = cnpj;
        this.storeName = storeName;
        this.contactEmail = contactEmail;
        this.commissionRate = commissionRate;
    }

    // Getters & Setters
    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCnpj() {
        return this.cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getStoreName() {
        return this.storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getContactEmail() {
        return this.contactEmail;
    }

    public void getContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public BigDecimal getCommissionRate() {
        return this.commissionRate;
    }

    public void setCommissionRate(BigDecimal commissionRate) {
        this.commissionRate = commissionRate;
    }
}
