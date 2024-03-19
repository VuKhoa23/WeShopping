import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  currentCateId: number = 1;
  products: Product[] = []
  searchMode: boolean = false;
  pageSize: number = 10;
  pageNum: number = 1;
  totalElements: number = 0;
  previousCateId: number = 0;
  previousKeyWord: string = "";
  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService){}

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

    if(this.previousKeyWord != theKeyWord){
      this.pageNum = 1;
    }

    this.previousKeyWord = theKeyWord;

    this.productService.searchProducts(theKeyWord, this.pageNum - 1, this.pageSize).subscribe(
      data=>{
        this.products = data._embedded.products;
        this.pageNum = data.page.number + 1;
        this.pageSize = data.page.size;
        this.totalElements = data.page.totalElements;
      }
    )

  }

  handleListProducts(){
    const hasCateId : boolean = this.route.snapshot.paramMap.has("id")
    // + : generate from string to num
    // ! : non-null assertion operator, tell the compiler that this get id method is not null
    this.currentCateId = hasCateId ? +this.route.snapshot.paramMap.get("id")! : 1

    
    // check if we have a different category than previo
    // angular will reuse a component if it is currently being viewed
    if(this.previousCateId != this.currentCateId){
      this.pageNum = 1;
    }

    this.previousCateId = this.currentCateId;

    // method is invoked when subcribe is called
    this.productService.getProductList(this.currentCateId, this.pageNum - 1, this.pageSize).subscribe(
      data => {
        this.products = data._embedded.products;
        this.pageNum = data.page.number + 1;
        this.pageSize = data.page.size;
        this.totalElements = data.page.totalElements;
      }
    )
  }

  updatePageSize(pageSize: string) {
    this.pageSize = +pageSize
    this.pageNum = 1;
    this.listProducts();
  }

  addToCart(product: Product) {
    const cartItem =  new CartItem(product);
    this.cartService.addToCart(cartItem);
  }
}
