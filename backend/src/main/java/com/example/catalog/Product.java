package com.example.catalog;
import jakarta.persistence.*;
@Entity
public class Product {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
  String name; double price;
  public Product(){} public Product(String n,double p){name=n;price=p;}
  public Long getId(){return id;} public String getName(){return name;} public double getPrice(){return price;}
  public void setName(String n){name=n;} public void setPrice(double p){price=p;}
}
