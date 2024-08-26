package com.agropharm.dto;

import com.agropharm.domain.OrderItem;
import com.agropharm.mapper.DTOEntity;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

public class OrderDTO implements DTOEntity {
    public Integer id;
    public Timestamp date;
    public UserDTO user;
    public List<OrderItemDTO> orderItems;
    public double totalPrice;

    public OrderDTO(){

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public List<OrderItemDTO> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemDTO> orderItems) {
        this.orderItems = orderItems;
    }

    public double getTotalPrice() {
        double totalPrice = 0;
        for (OrderItemDTO i: orderItems)
            totalPrice = totalPrice + i.getPrice();
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
