package com.vukhoa23.WeShopping.dao;

import com.vukhoa23.WeShopping.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
