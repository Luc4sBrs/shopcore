package com.shopcore.backend.exception;

/**
 * Exceção lançada quando um recurso (produto, categoria, etc.) não é encontrado.
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
