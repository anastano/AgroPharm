import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../model/product.model';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/auth.service';
import { CurrentUser } from '../../auth/model/auth.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

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


  constructor(private productService: ProductService, private cartService: CartService, private toastr: ToastrService, private authService: AuthService, private modalService: NgbModal) { }

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

  openEditModal(product: Product) {
    const modalRef = this.modalService.open(EditProductComponent);
    modalRef.componentInstance.product = { ...product };

    modalRef.result.then((result) => {
      if (result === 'Updated') {
        this.loadProducts();
      }
    }).catch((error) => {
      console.log('Modal dismissed');
    });
  }

  deleteProduct(productId: number, productName: string) {
    const modalRef = this.modalService.open(ConfirmDeleteComponent);
    modalRef.componentInstance.productName = productName;
  
    modalRef.result.then((result) => {
      if (result === 'confirm') {
        this.productService.deleteProduct(productId).subscribe(
          () => {
            this.toastr.success('Proizvod je uspešno obrisan', 'Uspeh');
            this.loadProducts();
          },
          (error) => {
            this.toastr.error('Došlo je do greške prilikom brisanja proizvoda', 'Greška');
          }
        );
      }
    }).catch((error) => {
      console.log('Modal dismissed');
    });
  }


}
