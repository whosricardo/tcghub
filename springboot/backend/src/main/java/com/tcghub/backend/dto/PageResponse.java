package com.tcghub.backend.dto;

import java.util.List;

public record PageResponse<T>(
        List<T> content,
        int currentPage,
        int totalPages,
        int totalElements) {
}
