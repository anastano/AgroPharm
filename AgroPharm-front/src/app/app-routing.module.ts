import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './common/home/home.component';
import { AllProductsComponent } from './product/all-products/all-products.component';
import { LoginComponent } from './auth/login/login.component';
import { ClientProfileComponent } from './client/client-profile/client-profile.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { OrdersComponent } from './seller/orders/orders.component';
import { AllOrdersComponent } from './admin/all-orders/all-orders.component';
import { ClientOrdersComponent } from './client/client-orders/client-orders.component';
import { DelivererOrdersComponent } from './deliverer/deliverer-orders/deliverer-orders.component';
import { CartComponent } from './product/cart/cart.component';
const routes: Routes = [
  {path: '',  component: HomeComponent},
  {path: 'all-products', component: AllProductsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin-profile', component: AdminProfileComponent},
  {path: 'client-profile', component: ClientProfileComponent},
  {path: 'seller-orders', component: OrdersComponent},
  {path: 'all-orders', component: AllOrdersComponent},
  {path: 'client-orders', component: ClientOrdersComponent},
  {path: 'deliverer-orders', component: DelivererOrdersComponent},
  {path: 'cart', component: CartComponent},
  

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
