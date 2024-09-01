package com.agropharm.dto;

import com.agropharm.domain.Address;
import com.agropharm.domain.OrderItem;
import com.agropharm.domain.User;

import java.util.List;

public class OrderRequestDTO {
    private List<OrderItemDTO> orderItems;
    private AddressDTO address;
    private UserDTO client;

    public OrderRequestDTO(){

    }

    public List<OrderItemDTO> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemDTO> orderItems) {
        this.orderItems = orderItems;
    }

    public AddressDTO getAddress() {
        return address;
    }

    public void setAddress(AddressDTO address) {
        this.address = address;
    }

    public UserDTO getClient() {
        return client;
    }

    public void setClient(UserDTO client) {
        this.client = client;
    }
}
