package com.shopcore.backend.controller;

import com.shopcore.backend.dto.ErrorResponse;
import com.shopcore.backend.dto.ProductDTO;
import com.shopcore.backend.service.ProductService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Validated
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private static final List<String> ALLOWED_SORT_PROPERTIES = Arrays.asList(
            "id", "name", "price", "discountPrice", "soldQuantity", "createdAt");

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<?> getAllProducts(
            @Parameter(description = "ID da categoria para filtrar", example = "1")
            @RequestParam(required = false) Long categoryId,
            @Parameter(description = "Preço mínimo (em reais)", example = "100.00")
            @RequestParam(required = false) BigDecimal minPrice,
            @Parameter(description = "Preço máximo (em reais)", example = "999.90")
            @RequestParam(required = false) BigDecimal maxPrice,
            @Parameter(description = "Página (zero-based)", example = "0")
            @RequestParam(defaultValue = "0") @Min(value = 0, message = "page deve ser maior ou igual a 0") int page,
            @Parameter(description = "Tamanho da página (1-100)", example = "12")
            @RequestParam(defaultValue = "12") @Min(value = 1, message = "size deve ser maior ou igual a 1") @Max(value = 100, message = "size deve ser menor ou igual a 100") int size,
            @Parameter(description = "Ordenação no formato campo,direção (ex: id,desc)", example = "id,asc")
            @RequestParam(defaultValue = "id,asc") String sort) {

        if (minPrice != null && maxPrice != null && minPrice.compareTo(maxPrice) > 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorResponse.of(
                    HttpStatus.BAD_REQUEST.value(),
                    "BAD_REQUEST",
                    "O preço mínimo deve ser menor ou igual ao preço máximo"));
        }

        Pageable pageable = PageRequest.of(page, size, parseSort(sort));
        return ResponseEntity.ok(productService.filterProducts(categoryId, minPrice, maxPrice, pageable));
    }

    @GetMapping("/featured")
    public ResponseEntity<Page<ProductDTO>> getFeatured(
            @RequestParam(defaultValue = "0") @Min(value = 0) int page,
            @RequestParam(defaultValue = "12") @Min(value = 1) @Max(value = 100) int size) {
        return ResponseEntity.ok(productService.getFeaturedProducts(PageRequest.of(page, size)));
    }

    @GetMapping("/best-sellers")
    public ResponseEntity<Page<ProductDTO>> getBestSellers(
            @RequestParam(defaultValue = "0") @Min(value = 0) int page,
            @RequestParam(defaultValue = "4") @Min(value = 1) @Max(value = 100) int size) {
        return ResponseEntity.ok(productService.getBestSellers(PageRequest.of(page, size)));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<ProductDTO>> search(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") @Min(value = 0) int page,
            @RequestParam(defaultValue = "12") @Min(value = 1) @Max(value = 100) int size) {
        return ResponseEntity.ok(productService.searchProducts(q, PageRequest.of(page, size)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getById(@PathVariable @Positive Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    private Sort parseSort(String sort) {
        String[] parts = sort.split(",");
        String property = parts[0];
        Sort.Direction direction = parts.length > 1 && parts[1].equalsIgnoreCase("desc")
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;
        if (!ALLOWED_SORT_PROPERTIES.contains(property)) {
            return Sort.by(Sort.Direction.ASC, "id");
        }
        return Sort.by(direction, property);
    }
}
