import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './all-products/all-products.component';
import { MaterialModule } from '../../material/material/material.module';


@NgModule({
  declarations: [
    AllProductsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ProductModule { }
