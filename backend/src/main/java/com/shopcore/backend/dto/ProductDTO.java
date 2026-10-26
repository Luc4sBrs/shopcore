package com.shopcore.backend.dto;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private BigDecimal discountPrice;
    private String imageUrl;
    private Long categoryId;
    private String categoryName;
    private Integer stockQuantity;
    private Integer soldQuantity;
    private Boolean isFeatured;
}
