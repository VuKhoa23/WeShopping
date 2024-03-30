package com.vukhoa23.WeShopping.Service;

import com.vukhoa23.WeShopping.dao.CustomerRepository;
import com.vukhoa23.WeShopping.dto.Purchase;
import com.vukhoa23.WeShopping.dto.PurchaseResponse;
import com.vukhoa23.WeShopping.entities.Customer;
import com.vukhoa23.WeShopping.entities.Order;
import com.vukhoa23.WeShopping.entities.OrderItem;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{
    private CustomerRepository customerRepository;
    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }
    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        // retrieve order from dto
        Order order = purchase.getOrder();
        // generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber((orderTrackingNumber));
        // populate order with orderitems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(orderItem -> {
            order.addItem(orderItem);
        });
        // populate addresses
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());
        // polulate customer
        Customer customer = purchase.getCustomer();
        customer.addOrder(order);
        // save to db
        customerRepository.save(customer);
        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }
}
