import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './common/home/home.component';
import { AllProductsComponent } from './product/all-products/all-products.component';

const routes: Routes = [
  {path: '',  redirectTo: '/all-products', pathMatch: 'full'},
  {path: 'all-products', component:AllProductsComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
