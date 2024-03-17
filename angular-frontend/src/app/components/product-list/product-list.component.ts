import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  currentCateId: number = 1;
  products: Product[] = []
  searchMode: boolean = false;
  constructor(private productService: ProductService, private route: ActivatedRoute){}

  ngOnInit() : void{
    this.route.paramMap.subscribe(()=> {
      this.listProducts();
    })
  }
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }
  }

  handleSearchProducts(){
    const theKeyWord = this.route.snapshot.paramMap.get('keyword')!;
    this.productService.searchProducts(theKeyWord).subscribe(
      data=>{
        this.products = data;
      }
    )
  }

  handleListProducts(){
    const hasCateId : boolean = this.route.snapshot.paramMap.has("id")
    // + : generate from string to num
    // ! : non-null assertion operator, tell the compiler that this get id method is not null
    this.currentCateId = hasCateId ? +this.route.snapshot.paramMap.get("id")! : 1
    // method is invoked when subcribe is called
    this.productService.getProductList(this.currentCateId).subscribe(
      data => {
        this.products = data;
      }
    )
  }
}
