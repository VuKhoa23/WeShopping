import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit{
  cartItems : CartItem[] = []
  totalPrice : number = 0;
  totalQuantity : number = 0;
  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    // subscribe to the changes of totalPrice and totalQuantity
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )

    this.cartService.computeTotal();
  }

  constructor(private cartService : CartService){}

}
