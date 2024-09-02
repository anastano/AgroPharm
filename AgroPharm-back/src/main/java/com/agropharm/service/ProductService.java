package com.agropharm.service;

import com.agropharm.domain.Product;
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

    /*public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAllPageable(pageable);
    }*/

    public Set<Product> getAll(){
        return new HashSet<>(productRepository.findAll());
    }
}
