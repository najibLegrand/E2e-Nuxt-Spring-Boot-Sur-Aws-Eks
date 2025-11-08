package com.example.catalog;
import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/api/products") @CrossOrigin
public class ProductController {
  private final ProductRepo repo; public ProductController(ProductRepo r){this.repo=r;}
  @GetMapping public List<Product> all(){ return repo.findAll(); }
  @PostMapping public Product add(@RequestBody Product p){ return repo.save(p); }
}
