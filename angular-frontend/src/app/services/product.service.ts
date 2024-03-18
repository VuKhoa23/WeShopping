import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable, map } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = "http://localhost:8080/api/products"

  private categoryUrl = "http://localhost:8080/api/product-category"

  constructor(private httpClient: HttpClient) { }
  // map json datas from spring to defined product array
  getProductList(currentCateId: number): Observable<Product[]>{
    const searchUrl = `${this.productsUrl}/search/findByCategoryId?id=${currentCateId}`
    return this.httpClient.get<GetReponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products))
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetReponseCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory))
  }

  searchProducts(theKeyWord: string): Observable<Product[]> {
    const searchUrl = `${this.productsUrl}/search/findByNameContaining?name=${theKeyWord}`
    return this.httpClient.get<GetReponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products))
  }

  getProduct(id: number): Observable<Product> {
    const searchUrl = `${this.productsUrl}/${id}`
    return this.httpClient.get<Product>(searchUrl)
  }
}

// unwrap json data to product
interface GetReponseProduct{
  _embedded :{
    products: Product[]
  }
}

interface GetReponseCategory{
  _embedded :{
    productCategory: ProductCategory[]
  }
}
