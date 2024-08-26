import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './common/home/home.component';
import { AllProductsComponent } from './product/all-products/all-products.component';
import { LoginComponent } from './auth/login/login.component';
import { ClientProfileComponent } from './client/client-profile/client-profile.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { OrdersComponent } from './seller/orders/orders.component';

const routes: Routes = [
  {path: '',  component: HomeComponent},
  {path: 'all-products', component: AllProductsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin-profile', component: AdminProfileComponent},
  {path: 'client-profile', component: ClientProfileComponent},
  {path: 'all-orders', component: OrdersComponent},
  

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
