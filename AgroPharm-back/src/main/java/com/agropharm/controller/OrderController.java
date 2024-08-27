package com.agropharm.controller;

import com.agropharm.domain.Order;
import com.agropharm.domain.enums.OrderStatus;
import com.agropharm.dto.OrderDTO;
import com.agropharm.mapper.DTOUtils;
import com.agropharm.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/approve/{orderId}")
    public ResponseEntity<String> approveOrder(@PathVariable Integer orderId) {
        try {
            orderService.updateOrderStatus(orderId, OrderStatus.APPROVED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"message\": \"Bad request\"}");
        }
        return ResponseEntity.ok().body("{\"message\": \"Order approved\"}");
    }


    @PostMapping(value = "/cancel/{orderId}")
    public ResponseEntity<String> cancelOrder(@PathVariable Integer orderId) {
        try {
            orderService.updateOrderStatus(orderId, OrderStatus.CANCELLED);
            //TODO: add penalty points
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"message\": \"Bad request\"}");
        }
        return ResponseEntity.ok().body("{\"message\": \"Order cancelled\"}");
    }

    @PostMapping(value = "/collect-for-delivery/{orderId}")
    public ResponseEntity<String> collectOrderForDelivery(@PathVariable Integer orderId ) {
        try {
            orderService.updateOrderStatus(orderId, OrderStatus.COLLECTED_FOR_DELIVERY);
            //TODO: assign deliverer
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"message\": \"Bad request\"}");
        }
        return ResponseEntity.ok().body("{\"message\": \"Order collected for delivery\"}");
    }

    @PostMapping(value = "/completed-success/{orderId}")
    public ResponseEntity<String> completeOrderDeliverySuccessfully(@PathVariable Integer orderId) {
        try {
            orderService.updateOrderStatus(orderId, OrderStatus.DELIVERY_COMPLETED_SUCCESSFULLY);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"message\": \"Bad request\"}");
        }
        return ResponseEntity.ok().body("{\"message\": \"Order delivery completed successfully\"}");
    }

    @PostMapping(value = "/completed-notsuccess/{orderId}")
    public ResponseEntity<String> completeOrderDeliveryUnsuccessfully(@PathVariable Integer orderId) {
        try {
            orderService.updateOrderStatus(orderId, OrderStatus.DELIVERY_COMPLETED_UNSUCCESSFULLY);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"message\": \"Bad request\"}");
        }
        return ResponseEntity.ok().body("{\"message\": \"Order delivery completed not successfully\"}");
    }
}
