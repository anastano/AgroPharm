import { Component, OnInit } from '@angular/core';
import { Product } from '../../product/model/product.model';
import { Category } from '../../product/model/category.model';
import { ProductService } from '../../product/product.service';
import { CartService } from '../../product/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';

  constructor(
    private productService: ProductService, private cartService: CartService, private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  loadCategories(): void {
    this.productService.getAllCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesName = this.searchTerm
        ? product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;
      const matchesCategory = this.selectedCategory
        ? product.category?.name === this.selectedCategory
        : true;

      return matchesName && matchesCategory;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.toastr.success('Proizvod ' + product.name + ' je dodat u korpu', 'Uspeh');
  }
}
