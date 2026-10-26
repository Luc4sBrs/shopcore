package com.shopcore.backend.dto;

import java.time.OffsetDateTime;
import lombok.Data;

@Data
public class ErrorResponse {
    private int status;
    private String error;
    private String message;
    private OffsetDateTime timestamp;

    public static ErrorResponse of(int status, String error, String message) {
        ErrorResponse response = new ErrorResponse();
        response.setStatus(status);
        response.setError(error);
        response.setMessage(message);
        response.setTimestamp(OffsetDateTime.now());
        return response;
    }
}
