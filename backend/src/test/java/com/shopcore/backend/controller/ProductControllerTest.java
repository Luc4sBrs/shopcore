package com.shopcore.backend.controller;

import com.shopcore.backend.dto.ProductDTO;
import com.shopcore.backend.dto.ProductDTO;
import com.shopcore.backend.exception.ResourceNotFoundException;
import com.shopcore.backend.security.JwtService;
import com.shopcore.backend.service.ProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ProductController.class)
@AutoConfigureMockMvc(addFilters = false)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private UserDetailsService userDetailsService;

    @Test
    void shouldReturnProductsPage() throws Exception {
        ProductDTO product = new ProductDTO();
        product.setId(1L);
        product.setName("Smartphone Ultra X");
        product.setPrice(new BigDecimal("4999.90"));
        product.setCategoryId(1L);
        product.setCategoryName("Tecnologia e Eletrônicos");
        product.setStockQuantity(50);
        product.setSoldQuantity(340);
        product.setIsFeatured(true);

        when(productService.filterProducts(any(), any(), any(), any())).thenReturn(new PageImpl<>(List.of(product)));

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id").value(1))
                .andExpect(jsonPath("$.content[0].name").value("Smartphone Ultra X"));
    }

    @Test
    void shouldReturnProductById() throws Exception {
        ProductDTO product = new ProductDTO();
        product.setId(1L);
        product.setName("Smartphone Ultra X");
        product.setPrice(new BigDecimal("4999.90"));

        when(productService.getProductById(1L)).thenReturn(product);

        mockMvc.perform(get("/api/products/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Smartphone Ultra X"));
    }

    @Test
    void shouldReturnNotFoundWhenProductDoesNotExist() throws Exception {
        when(productService.getProductById(999L)).thenThrow(new ResourceNotFoundException("Product not found with id: 999"));

        mockMvc.perform(get("/api/products/{id}", 999L))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldReturnPageForSearch() throws Exception {
        when(productService.searchProducts(eq("smartphone"), any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of()));

        mockMvc.perform(get("/api/products/search")
                        .param("q", "smartphone")
                        .param("page", "0")
                        .param("size", "12"))
                .andExpect(status().isOk());
    }
}
