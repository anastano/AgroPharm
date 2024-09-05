package com.agropharm.dto;

import com.agropharm.mapper.DTOEntity;

public class ProductCreationDTO implements DTOEntity {
    private String name;
    private String description;
    private double price;
    private double supplies;
    private double reserved;
    private Integer categoryId;
    private String imageUrl;

    public ProductCreationDTO(){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getSupplies() {
        return supplies;
    }

    public void setSupplies(double supplies) {
        this.supplies = supplies;
    }

    public double getReserved() {
        return reserved;
    }

    public void setReserved(double reserved) {
        this.reserved = reserved;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
