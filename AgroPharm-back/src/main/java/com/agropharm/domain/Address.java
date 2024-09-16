package com.agropharm.domain;

import javax.persistence.*;

@Entity
@Table(name = "addresses")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(name = "street")
    private String street;
    @Column(name = "street_number")
    private String streetNumber;
    @Column(name = "city")
    private String city;
    @Column(name = "country")
    private String country;
    @Column(name = "postal_code")
    private String postalCode;

    public Address(){

    }

    public Address(String street, String streetNumber, String city, String country, String postalCode) {
        this.street = street;
        this.streetNumber = streetNumber;
        this.city = city;
        this.country = country;
        this.postalCode = postalCode;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getStreetNumber() {
        return streetNumber;
    }

    public void setStreetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }
}
