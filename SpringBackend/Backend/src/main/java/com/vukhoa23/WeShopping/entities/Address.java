package com.vukhoa23.WeShopping.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="address")
@Getter
@Setter
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name="street")
    private String street;
    @Column(name="city")
    private String city;
    @Column(name="country")
    private String country;
    @Column(name="zip_code")
    private String zipCode;
    @OneToOne
    @PrimaryKeyJoinColumn
    // map primary keys of 2 table (@Id annotation)
    private Order order;
}
