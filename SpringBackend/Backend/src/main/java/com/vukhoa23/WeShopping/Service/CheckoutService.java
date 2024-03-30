package com.vukhoa23.WeShopping.Service;

import com.vukhoa23.WeShopping.dto.Purchase;
import com.vukhoa23.WeShopping.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
