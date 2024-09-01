import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../model/product.model';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private productService: ProductService, private cartService: CartService, private toastr: ToastrService) { }

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
    this.toastr.success('Proizvod ' + product.name + ' je dodat u korpu', 'Uspeh');
  }

}
