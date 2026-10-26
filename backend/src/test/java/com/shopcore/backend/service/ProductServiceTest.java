package com.shopcore.backend.service;

import com.shopcore.backend.dto.ProductDTO;
import com.shopcore.backend.exception.ResourceNotFoundException;
import com.shopcore.backend.model.Category;
import com.shopcore.backend.model.Product;
import com.shopcore.backend.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    void shouldReturnProductById() {
        Product product = buildProduct();
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        ProductDTO result = productService.getProductById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Smartphone Ultra X", result.getName());
        assertEquals(new BigDecimal("4999.90"), result.getPrice());
    }

    @Test
    void shouldThrowWhenProductNotFound() {
        when(productRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> productService.getProductById(999L));
    }

    @Test
    void shouldReturnAllProductsAsPage() {
        Product product = buildProduct();
        Page<Product> page = new PageImpl<>(List.of(product), PageRequest.of(0, 12), 1);
        when(productRepository.findAll(any(Pageable.class))).thenReturn(page);

        Page<ProductDTO> result = productService.getAllProducts(PageRequest.of(0, 12));

        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        assertEquals(1L, result.getContent().get(0).getId());
        assertEquals(1, result.getTotalElements());
    }

    @Test
    void shouldReturnBestSellersSortedBySoldQuantity() {
        Product product = buildProduct();
        Page<Product> page = new PageImpl<>(List.of(product), PageRequest.of(0, 4), 1);
        when(productRepository.findAll(any(Pageable.class))).thenReturn(page);

        Page<ProductDTO> result = productService.getBestSellers(PageRequest.of(0, 4));

        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        assertEquals(Integer.valueOf(340), result.getContent().get(0).getSoldQuantity());
    }

    private Product buildProduct() {
        Category category = Category.builder()
                .id(1L)
                .name("Tecnologia e Eletrônicos")
                .description("Gadgets, computadores e smartphones")
                .slug("tecnologia")
                .build();

        return Product.builder()
                .id(1L)
                .category(category)
                .name("Smartphone Ultra X")
                .description("O smartphone mais avançado do mercado com câmera de 200MP")
                .price(new BigDecimal("4999.90"))
                .discountPrice(new BigDecimal("4499.00"))
                .stockQuantity(50)
                .soldQuantity(340)
                .imageUrl("https://picsum.photos/seed/prod1/400/400")
                .isFeatured(true)
                .build();
    }
}
