import { Component, OnInit } from '@angular/core';
import { Cart } from '../model/cart.model';
import { CartService } from '../cart.service';
import { Address } from '../../auth/model/auth.model';
import { OrdersService } from '../../seller/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: Cart = new Cart();
  cartTotal: number = 0;
  showAddressForm: boolean = false;

  constructor(private cartService: CartService, private orderService: OrdersService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.calculateTotal();
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
    this.showAddressForm = true;
  }

  onAddressSubmitted(address: Address) {
    const orderRequest = {
      orderItems: this.cart.items.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
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
}