package com.agropharm.controller;

import com.agropharm.dto.OrderDTO;
import com.agropharm.mapper.DTOUtils;
import com.agropharm.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/all")
    public ResponseEntity<Set<OrderDTO>> getAll(){
        Set<OrderDTO> orderDTOs = (Set<OrderDTO>) new DTOUtils().convertToDtos(orderService.getAll(), new OrderDTO());
        return new ResponseEntity<>(orderDTOs, HttpStatus.OK);
    }
}
