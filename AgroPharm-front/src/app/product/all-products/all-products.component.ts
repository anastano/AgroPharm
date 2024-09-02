import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../model/product.model';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/auth.service';
import { CurrentUser } from '../../auth/model/auth.model';

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
  public currentUser: CurrentUser | undefined;


  constructor(private productService: ProductService, private cartService: CartService, private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        console.log("User(navbar): ", user.email, " Role: ", user.role);
        this.currentUser = user;
      }
    });
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
