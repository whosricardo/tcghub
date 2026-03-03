package com.tcghub.backend.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<?> handleDuplicateResource(DuplicateResourceException dException) {
        ApiError aError = new ApiError(HttpStatus.CONFLICT, dException.getMessage());
        return new ResponseEntity<>(aError, HttpStatus.CONFLICT);
    }
}
