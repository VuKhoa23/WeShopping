package com.vukhoa23.WeShopping.dao;

import com.vukhoa23.WeShopping.entities.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

// collection resource rel is the json entry
// like response.productCategory
// path is the query path /product-category
@RepositoryRestResource(collectionResourceRel = "productCategory", path="product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
