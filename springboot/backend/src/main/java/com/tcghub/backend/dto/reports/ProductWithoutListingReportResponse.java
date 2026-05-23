package com.tcghub.backend.dto.reports;

public record ProductWithoutListingReportResponse(
    Long productId,
    String name,
    String collection
) {}
