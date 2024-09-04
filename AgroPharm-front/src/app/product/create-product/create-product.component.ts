import { Component, OnInit } from '@angular/core';
import { ProductCreation } from '../model/product.model';
import { Category } from '../model/category.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit{
  product: ProductCreation = {
    name: '',
    description: '',
    price: 0,
    supplies: 0,
    reserved: 0,
    categoryId: 0,
    imageUrl: ''
  };

  categories: Category[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onSubmit(): void {
    this.productService.createProduct(this.product).subscribe(response => {
      console.log('Product created successfully', response);
    }, error => {
      console.error('Error creating product', error);
    });
  }
}
