import { Component, OnInit } from '@angular/core';
import { Cart } from '../model/cart.model';
import { CartService } from '../cart.service';
import { Address, User } from '../../auth/model/auth.model';
import { OrdersService } from '../../seller/orders.service';
import { OrderRequest } from '../../seller/model/order.model';
import { AuthService } from '../../auth/auth.service';

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

  constructor(private cartService: CartService, private orderService: OrdersService, private authService: AuthService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.calculateTotal();
    this.fetchUserAddress();
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

  calculateTotal() {
    this.cartTotal = this.cartService.getTotal();
  }

  createOrder() {
    if (this.userAddress) {
      this.useExistingAddress = true; 
    } else {
      this.showAddressForm = true; 
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
          alert('Narudžbina uspešno kreirana sa postojećom adresom!');
          this.cartService.clearCart();
          this.useExistingAddress = false;
        },
        error => {
          alert('Došlo je do greške prilikom kreiranja narudžbine.');
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
        alert('Narudžbina uspešno kreirana!');
        this.cartService.clearCart();
        this.showAddressForm = false;
      },
      error => {
        alert('Došlo je do greške prilikom kreiranja narudžbine.');
      }
    );
  }

  declineExistingAddress() {
    this.useExistingAddress = false;
    this.showAddressForm = true; 
  }
}