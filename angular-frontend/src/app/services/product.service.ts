import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api/products"

  constructor(private httpClient: HttpClient) { }
  // map json datas from spring to defined product array
  getProductList(currentCateId: number): Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${currentCateId}`
    return this.httpClient.get<GetReponse>(searchUrl).pipe(
      map(response => response._embedded.products))
  }
}

// unwrap json data to product
interface GetReponse{
  _embedded :{
    products: Product[]
  }
}
