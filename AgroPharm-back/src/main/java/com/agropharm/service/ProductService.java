package com.agropharm.service;

import com.agropharm.domain.Category;
import com.agropharm.domain.Product;
import com.agropharm.dto.ProductCreationDTO;
import com.agropharm.dto.ProductDTO;
import com.agropharm.repository.CategoryRepository;
import com.agropharm.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    public Set<Product> getAll(){
        return new HashSet<>(productRepository.findAll());
    }

    public Product createProduct(ProductCreationDTO productCreationDTO) {
        Product product = new Product();
        product.setName(productCreationDTO.getName());
        product.setDescription(productCreationDTO.getDescription());
        product.setPrice(productCreationDTO.getPrice());
        product.setSupplies(productCreationDTO.getSupplies());
        product.setReserved(productCreationDTO.getReserved());
        product.setImageUrl(productCreationDTO.getImageUrl());

        Category category = categoryRepository.findById(productCreationDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        product.setCategory(category);

        return productRepository.save(product);
    }

    public Product updateProduct(Integer id, ProductDTO productUpdateDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(productUpdateDTO.getName());
        product.setDescription(productUpdateDTO.getDescription());
        product.setPrice(productUpdateDTO.getPrice());
        product.setSupplies(productUpdateDTO.getSupplies());
        product.setReserved(productUpdateDTO.getReserved());
        product.setImageUrl(productUpdateDTO.getImageUrl());

        Category category = categoryRepository.findById(productUpdateDTO.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        product.setCategory(category);

        return productRepository.save(product);
    }

    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }

}
