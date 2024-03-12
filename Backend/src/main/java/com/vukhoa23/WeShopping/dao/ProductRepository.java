package com.vukhoa23.WeShopping.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import com.vukhoa23.WeShopping.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}

