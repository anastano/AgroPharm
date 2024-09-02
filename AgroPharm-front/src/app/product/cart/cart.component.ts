import { Component, OnInit } from '@angular/core';
import { Cart } from '../model/cart.model';
import { CartService } from '../cart.service';
import { Address, User } from '../../auth/model/auth.model';
import { OrdersService } from '../../seller/orders.service';
import { OrderRequest } from '../../seller/model/order.model';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: Cart = new Cart();
  cartTotal: number = 0;
  showAddressForm: boolean = false;
  useExistingAddress: boolean = false; 
  userAddress?: Address; 
  isAuthenticated: boolean = false;

  constructor(private cartService: CartService, private orderService: OrdersService, private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.calculateTotal();
    this.isAuthenticated = this.authService.isAuthenticated(); 
    
    if (this.isAuthenticated) {
      this.fetchUserAddress();
    }
    console.log(this.cart);
  }

  fetchUserAddress() {
    this.authService.getUser().subscribe((user: User) => {
      this.userAddress = user.address; 
    });
  }

  removeFromCart(productId: number | undefined) {
    if (productId !== undefined) {
      this.cartService.removeFromCart(productId);
      this.calculateTotal();
    } else {
      console.error('Product id is undefined');
    }
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.cartService.saveCart();
    this.calculateTotal();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.saveCart();
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.cartTotal = this.cartService.getTotal();
  }

  createOrder() {
    if (this.isAuthenticated) {
      if (this.userAddress) {
        this.useExistingAddress = true;
      } else {
        this.showAddressForm = true;
      }
    } else {
      window.location.href = '/unauthenticated-order';
    }
  }

  confirmUseExistingAddress() {
    if (this.userAddress) {
      const orderRequest: OrderRequest = {
        orderItems: this.cart.items.map(item => ({
          product: item.product,
          quantity: item.quantity,
          price: item.product.price * item.quantity
        })),
        address: this.userAddress
      };

      this.orderService.createOrder(orderRequest).subscribe(
        response => {
          this.toastr.success('Narudžbina uspešno kreirana!', 'Uspeh');
          this.cartService.clearCart();
          this.cartTotal = 0;
          this.useExistingAddress = false;
        },
        error => {
          this.toastr.error('Došlo je do greške prilikom kreiranja narudžbine.', 'Greška');
        }
      );
    }
  }

  onAddressSubmitted(address: Address) {
    const orderRequest: OrderRequest = {
      orderItems: this.cart.items.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.product.price * item.quantity
      })),
      address: address
    };

    this.orderService.createOrder(orderRequest).subscribe(
      response => {
        this.toastr.success('Narudžbina uspešno kreirana!', 'Uspeh');
        this.cartService.clearCart();
        this.showAddressForm = false;
        this.cartTotal = 0;
      },
      error => {
        this.toastr.error('Došlo je do greške prilikom kreiranja narudžbine.', 'Greška');
      }
    );
  }

  declineExistingAddress() {
    this.useExistingAddress = false;
    this.showAddressForm = true; 
  }
}