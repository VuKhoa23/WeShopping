package com.vukhoa23.WeShopping.dao;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.vukhoa23.WeShopping.entities.Product;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin
public interface ProductRepository extends JpaRepository<Product, Long> {
    // automatically exposed the endpoint for retrieving product by category id
    // /search/findByCategoryId?:id=x
    Page<Product> findByCategoryId(@Param("id")Long id, Pageable pageable);
}

