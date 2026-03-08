package com.tcghub.backend.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.stream.Collectors;

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

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationErrors(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));
        ApiError aError = new ApiError(HttpStatus.BAD_REQUEST, message);
        return new ResponseEntity<>(aError, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGenericException(Exception ex) {
        ApiError aError = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Erro interno do servidor");
        return new ResponseEntity<>(aError, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
