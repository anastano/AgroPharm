package com.agropharm.controller;

import com.agropharm.domain.Order;
import com.agropharm.domain.Product;
import com.agropharm.domain.User;
import com.agropharm.dto.CategoryDTO;
import com.agropharm.dto.ProductCreationDTO;
import com.agropharm.dto.ProductDTO;
import com.agropharm.dto.UserDTO;
import com.agropharm.mapper.DTOUtils;
import com.agropharm.service.CategoryService;
import com.agropharm.service.NotificationService;
import com.agropharm.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "api/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private NotificationService notificationService;

    /*@GetMapping("/all")
    public Page<Product> getAllProducts(@RequestParam(defaultValue = "0") int page,
                                        @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productService.getAllProducts(pageable);
    }*/

    @GetMapping("/all")
    public ResponseEntity<Set<ProductDTO>> getAll() {
        Set<ProductDTO> productDTOS = (Set<ProductDTO>) new DTOUtils().convertToDtos(productService.getAll(), new ProductDTO());
        return new ResponseEntity<>(productDTOS, HttpStatus.OK);
    }

    @GetMapping("/categories")
    public ResponseEntity<Set<CategoryDTO>> getAllCategories() {
        Set<CategoryDTO> categoryDTOS = (Set<CategoryDTO>) new DTOUtils().convertToDtos(categoryService.getAll(), new CategoryDTO());
        return new ResponseEntity<>(categoryDTOS, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createProduct(@RequestBody ProductCreationDTO productCreationDTO) {
        try {
            Product createdProduct = productService.createProduct(productCreationDTO);
            String content = "Novi proizvod je dodat.";
            notificationService.createNotificationForAllUsersByRole("Novi proizvod", content, "SELLER");

        }catch (Exception e){
            return ResponseEntity.badRequest().body("{\"message\":\"" + e.getMessage() + "\"}");
        }
        return ResponseEntity.ok().body("{\"message\": \"You have successfully added new product\"}");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable Integer id, @RequestBody ProductDTO productUpdateDTO) {
        try {
            Product updatedProduct = productService.updateProduct(id, productUpdateDTO);
            String content = "Proizvod " + productUpdateDTO.name + " je izmenjen.";
            notificationService.createNotificationForAllUsersByRole("Proizvod izmenjen", content, "SELLER");

        }catch (Exception e){
            return ResponseEntity.badRequest().body("{\"message\":\"" + e.getMessage() + "\"}");
        }
        return ResponseEntity.ok().body("{\"message\": \"You have successfully updated product\"}");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Integer id) {
        try {
            productService.deleteProduct(id);
            String content = "Proizvod sa brojem " + id + " je obrisan.";
            notificationService.createNotificationForAllUsersByRole("Proizvod obrisan", content, "SELLER");

        }catch (Exception e){
            return ResponseEntity.badRequest().body("{\"message\":\"" + e.getMessage() + "\"}");
        }
        return ResponseEntity.ok().body("{\"message\": \"You have successfully deleted product\"}");

    }
}
