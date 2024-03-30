package com.vukhoa23.WeShopping.dto;

import lombok.Data;

@Data
public class PurchaseResponse {
    // lombok generate constructors for final fields
    private final String orderTrackingNumber;
}
