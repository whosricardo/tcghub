package com.tcghub.backend.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<?> handleDuplicateResource(DuplicateResourceException duplicateException) {
        ApiError aError = new ApiError(HttpStatus.CONFLICT, duplicateException.getMessage());
        return new ResponseEntity<>(aError, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<?> handleNotFoundException(NotFoundException notFoundException) {
        ApiError aError = new ApiError(HttpStatus.NOT_FOUND, notFoundException.getMessage());
        return new ResponseEntity<>(aError, HttpStatus.NOT_FOUND);
    }
}
