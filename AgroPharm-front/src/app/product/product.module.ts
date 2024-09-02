import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './all-products/all-products.component';
import { MaterialModule } from '../../material/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CartComponent } from './cart/cart.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnauthenticatedOrderComponent } from './unauthenticated-order/unauthenticated-order.component';

@NgModule({
  declarations: [
    AllProductsComponent,
    CartComponent,
    AddressFormComponent,
    UnauthenticatedOrderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    ToastrModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProductModule { }
