import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../model/product.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit {
  products: Product[] = [];
  currentPage = 0;
  totalPages = 0;
  pageSize = 10;

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
      this.products = data;
    });
  }

  //add pagination later again
  /*onPageChange(page: number) {
    this.currentPage = page;
    this.loadProducts();
  }*/

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log('Proizvod dodat u korpu:', product);
    window.alert("proizvod dodat u korpu " + product.name);
  }

}
