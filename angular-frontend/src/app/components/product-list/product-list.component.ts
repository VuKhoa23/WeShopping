import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-table.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = []
  constructor(private productService: ProductService){}

  ngOnInit() : void{
    this.listProducts();
  }
  listProducts() {
    // method is invoked when subcribe is called
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    )
  }
}
