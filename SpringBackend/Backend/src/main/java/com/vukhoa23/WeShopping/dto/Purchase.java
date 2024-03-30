package com.vukhoa23.WeShopping.dto;

import com.vukhoa23.WeShopping.entities.Address;
import com.vukhoa23.WeShopping.entities.Customer;
import com.vukhoa23.WeShopping.entities.Order;
import com.vukhoa23.WeShopping.entities.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
