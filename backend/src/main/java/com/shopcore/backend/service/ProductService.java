package com.shopcore.backend.service;

import com.shopcore.backend.dto.ProductDTO;
import com.shopcore.backend.exception.ResourceNotFoundException;
import com.shopcore.backend.model.Product;
import com.shopcore.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;

    public Page<ProductDTO> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable).map(this::convertToDTO);
    }

    public Page<ProductDTO> getFeaturedProducts(Pageable pageable) {
        return productRepository.findByIsFeaturedTrue(pageable).map(this::convertToDTO);
    }

    public Page<ProductDTO> getBestSellers(Pageable pageable) {
        return productRepository.findAll(PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "soldQuantity")))
                .map(this::convertToDTO);
    }

    public Page<ProductDTO> searchProducts(String query, Pageable pageable) {
        if (query == null || query.isBlank()) {
            return Page.empty(pageable);
        }
        return productRepository.searchByName(query.trim(), pageable).map(this::convertToDTO);
    }

    public Page<ProductDTO> getProductsByCategory(Long categoryId, Pageable pageable) {
        return productRepository.findByCategoryId(categoryId, pageable).map(this::convertToDTO);
    }

    public Page<ProductDTO> filterProducts(Long categoryId, BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable) {
        if (categoryId != null) {
            if (minPrice != null && maxPrice != null) {
                return productRepository.findByPriceBetweenAndCategoryId(minPrice, maxPrice, categoryId, pageable)
                        .map(this::convertToDTO);
            }
            return productRepository.findByCategoryId(categoryId, pageable).map(this::convertToDTO);
        }
        if (minPrice != null && maxPrice != null) {
            return productRepository.findByPriceBetween(minPrice, maxPrice, pageable).map(this::convertToDTO);
        }
        return getAllProducts(pageable);
    }

    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return convertToDTO(product);
    }

    private ProductDTO convertToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setDiscountPrice(product.getDiscountPrice());
        dto.setImageUrl(product.getImageUrl());
        dto.setStockQuantity(product.getStockQuantity());
        dto.setSoldQuantity(product.getSoldQuantity());
        dto.setIsFeatured(product.getIsFeatured());
        dto.setCategoryId(product.getCategory().getId());
        dto.setCategoryName(product.getCategory().getName());
        return dto;
    }
}
