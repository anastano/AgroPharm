import { Component } from '@angular/core';
import { Address } from '../../auth/model/auth.model';
import { CartService } from '../cart.service';
import { OrdersService } from '../../seller/orders.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OrderRequest } from '../../seller/model/order.model';

@Component({
  selector: 'app-unauthenticated-order',
  templateUrl: './unauthenticated-order.component.html',
  styleUrl: './unauthenticated-order.component.css'
})
export class UnauthenticatedOrderComponent {
  address: Address = { street: '', streetNumber: '', city: '', country: '', postalCode: '' };
  name: string = '';
  surname: string = '';
  phoneNumber: string = '';
  email: string = '';
  addressConfirmed: boolean = false;  

  constructor(private cartService: CartService, private orderService: OrdersService, private toastr: ToastrService, private router: Router) {}

  onAddressSubmitted(address: Address) {
    this.address = address;
    this.addressConfirmed = true;
    this.toastr.success('Adresa uspešno potvrđena!', 'Uspeh');
  }

  submitOrder() {
    const cart = this.cartService.getCart();

    if (this.name && this.surname && this.phoneNumber && this.email && this.addressConfirmed) {
      const orderRequest: OrderRequest = {
        orderItems: cart.items.map(item => ({
          product: item.product,
          quantity: item.quantity,
          price: item.product.price * item.quantity
        })),
        address: this.address
      };

      this.orderService.createOrder(orderRequest).subscribe(
        response => {
          this.toastr.success('Narudžbina uspešno kreirana!', 'Uspeh');
          this.cartService.clearCart();
          this.router.navigate(['/']);
        },
        error => {
          this.toastr.error('Došlo je do greške prilikom kreiranja narudžbine.', 'Greška');
        }
      );
    } else {
      this.toastr.error('Molimo unesite sve podatke i potvrdite adresu.', 'Greška');
    }
  }
}
