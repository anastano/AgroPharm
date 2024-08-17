package com.agropharm.dto;

import com.agropharm.mapper.DTOEntity;

public class CategoryDTO implements DTOEntity {
    public Integer id;
    public String name;
    public String description;

    public CategoryDTO(){
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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
}
