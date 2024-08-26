package com.agropharm.dto;

import com.agropharm.mapper.DTOEntity;

public class OrderItemDTO implements DTOEntity {
    private Integer id;
    private int quantity;
    private ProductDTO product;
    private double price;

    public OrderItemDTO(){

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public ProductDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
    }

    public double getPrice() {
        return product.getPrice() * quantity;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
