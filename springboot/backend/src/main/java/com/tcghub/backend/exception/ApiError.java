package com.tcghub.backend.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import lombok.Data;

@Data
public class ApiError {
    private int status;
    private String error;
    private LocalDateTime timestamp;

    public ApiError(HttpStatus hStatus, String error) {
        this.status = hStatus.value();
        this.error = error;
        this.timestamp = LocalDateTime.now();
    }
}
