import { Component, OnInit } from '@angular/core';
import { ProductCreation } from '../model/product.model';
import { Category } from '../model/category.model';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private productService: ProductService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.productService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onSubmit(): void {
    this.productService.createProduct(this.product).subscribe(response => {
      console.log('Product created successfully', response);
      this.toastr.success('Proizvod je uspešno kreiran', 'Uspeh');
      this.router.navigate(['/all-products']); 
    }, error => {
      console.error('Error creating product', error);
      this.toastr.error('Greška prilikom kreiranja proizvoda', 'Greška');
    });
  }
}
