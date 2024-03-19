import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  addToCart(cartItem : CartItem): void{
    // check if item is in cart
    let isExist: boolean = false;
    let existingCartItem: CartItem = undefined!;
    // find item base on product id
    if(this.cartItems.length > 0){
      for(let item of this.cartItems){
        if(item.id === cartItem.id){
          existingCartItem = item;
          isExist = true;
        }
      }
    }

    if(isExist){
      existingCartItem.quantity++;
    }else{
      this.cartItems.push(cartItem);
    }

    this.computeTotal();

  }
  computeTotal() {
    let totalPrice : number = 0.00;
    let totalQuantity: number = 0;

    for(let item of this.cartItems){
      totalPrice += item.quantity * item.unitPrice;
      totalQuantity += item.quantity;
    }

    this.totalPrice.next(totalPrice)
    this.totalQuantity.next(totalQuantity);

  }

  decermentQuantity(item: CartItem) {
    item.quantity--;
    if(item.quantity === 0){
      this.remove(item)
    }else{
      this.computeTotal();
    }
  }
  remove(item: CartItem) {
    const index = this.cartItems.findIndex(tempItem => item.id === tempItem.id)
    if(index > -1){
      this.cartItems.splice(index, 1);
      this.computeTotal();
    }
  }

  constructor() { }
}
