import { Injectable } from '@angular/core';
import { Cart } from './model/cart.model';
import { Product } from './model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_KEY = 'cart';

  constructor() {
    this.loadCart();
  }

  private cart: Cart = new Cart();

  private loadCart() {
    const cartData = sessionStorage.getItem(this.CART_KEY);
    if (cartData) {
      this.cart = JSON.parse(cartData);
    }
  }

  saveCart() {
    sessionStorage.setItem(this.CART_KEY, JSON.stringify(this.cart));
  }

  getCart() {
    return this.cart;
  }

  addToCart(product: Product) {
    const existingItem = this.cart.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.items.push({ product, quantity: 1 });
    }
    this.saveCart(); 
  }

  removeFromCart(productId: number) {
    this.cart.items = this.cart.items.filter(item => item.product.id !== productId);
    this.saveCart();  
  }

  clearCart() {
    this.cart.items = [];
    this.saveCart(); 
  }

  getTotal() {
    return this.cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}