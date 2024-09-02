package com.agropharm.controller;

import com.agropharm.domain.Order;
import com.agropharm.domain.User;
import com.agropharm.domain.enums.OrderStatus;
import com.agropharm.dto.OrderDTO;
import com.agropharm.dto.OrderRequestDTO;
import com.agropharm.dto.UserDTO;
import com.agropharm.mapper.DTOUtils;
import com.agropharm.service.OrderService;
import com.agropharm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    /*@GetMapping("/all")
    public ResponseEntity<Set<OrderDTO>> getAll(){
        Set<OrderDTO> orderDTOs = (Set<OrderDTO>) new DTOUtils().convertToDtos(orderService.getAll(), new OrderDTO());
        return new ResponseEntity<>(orderDTOs, HttpStatus.OK);
    }*/

    @GetMapping("/all")
    public ResponseEntity<Set<OrderDTO>> getAll(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        System.out.println("Authorization header: " + authHeader);

        Set<OrderDTO> orderDTOs = (Set<OrderDTO>) new DTOUtils().convertToDtos(orderService.getAll(), new OrderDTO());
        return new ResponseEntity<>(orderDTOs, HttpStatus.OK);
    }

    @GetMapping(value = "/by-client")
    public ResponseEntity<Set<OrderDTO>> getByClient(Principal user) {
        User client = userService.getByEmail(user.getName());
        Set<Order> orders = orderService.getAllOrdersByClientId(client.getId());
        Set<OrderDTO> orderDTOs = new DTOUtils().convertToDtos(orders, new OrderDTO());
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

    @PostMapping("/reject/{orderId}")
    public ResponseEntity<String> rejectOrder(@PathVariable Integer orderId) {
        try {
            orderService.updateOrderStatus(orderId, OrderStatus.REJECTED);
            //todo odbij
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"message\": \"Bad request\"}");
        }
        return ResponseEntity.ok().body("{\"message\": \"Order rejected successfully\"}");
    }

    @PostMapping(value = "/cancel/{orderId}")
    public ResponseEntity<String> cancelOrder(@PathVariable Integer orderId, Principal user) {
        try {
            orderService.updateOrderStatus(orderId, OrderStatus.CANCELLED);
            User client = userService.getByEmail(user.getName());
            userService.awardPenaltyPoints(client.getId());
            //TODO: obavestenja korisniku
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"message\": \"Bad request\"}");
        }
        return ResponseEntity.ok().body("{\"message\": \"Order cancelled\"}");
    }

    @PostMapping(value = "/collect-for-delivery/{orderId}")
    public ResponseEntity<String> collectOrderForDelivery(@PathVariable Integer orderId, Principal user ) {
        try {
            orderService.updateOrderStatus(orderId, OrderStatus.COLLECTED_FOR_DELIVERY);
            User deliverer = userService.getByEmail(user.getName());
            orderService.assignDeliverer(orderId, deliverer);
            //TODO: obavestenja, korisniku
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

    @PostMapping(value = "/create")
    public ResponseEntity<String> createOrder(@RequestBody OrderRequestDTO orderRequest, Principal user) {
        try {
            User client = userService.getByEmail(user.getName());
            UserDTO userDTO = (UserDTO) new DTOUtils().convertToDto(client, new UserDTO());
            orderRequest.setClient(userDTO);
            Order createdOrder = orderService.createOrder(orderRequest);
            //TODO: obavestenja da je nova kreirana, selleru

        }catch (Exception e){
            return ResponseEntity.badRequest().body("{\"message\":\"" + e.getMessage() + "\"}");
        }
        return ResponseEntity.ok().body("{\"message\": \"You have successfully made an order\"}");

    }

    //metoda za pravljenje narudzbina za prijavljene i neprijavljene klijente, potrebno jos obraditi cuvanje podataka o neautentifikovanom klijentu

    /*@PostMapping(value = "/create")
    public ResponseEntity<String> createOrder(@RequestBody OrderRequestDTO orderRequest, Principal user) {
        try {
            if (user != null) {
                User client = userService.getByEmail(user.getName());
                UserDTO userDTO = (UserDTO) new DTOUtils().convertToDto(client, new UserDTO());
                orderRequest.setClient(userDTO);
            } else {
                orderRequest.setClient(null);
            }
            Order createdOrder = orderService.createOrder(orderRequest);
            return ResponseEntity.ok().body("{\"message\": \"You have successfully made an order\"}");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"message\":\"" + e.getMessage() + "\"}");
        }
    }*/

}
