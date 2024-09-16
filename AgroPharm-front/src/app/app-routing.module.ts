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
import { UnauthenticatedOrderComponent } from './product/unauthenticated-order/unauthenticated-order.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { RegisterUserComponent } from './admin/register-user/register-user.component';
import { RegisterClientComponent } from './auth/register-client/register-client.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { NotificationsComponent } from './common/notifications/notifications.component';

const routes: Routes = [
  {path: '',  component: HomeComponent},
  {path: 'all-products', component: AllProductsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ClientProfileComponent},
  {path: 'seller-orders', component: OrdersComponent},
  {path: 'all-orders', component: AllOrdersComponent},
  {path: 'client-orders', component: ClientOrdersComponent},
  {path: 'deliverer-orders', component: DelivererOrdersComponent},
  {path: 'cart', component: CartComponent},
  {path: 'unauthenticated-order', component: UnauthenticatedOrderComponent },
  {path: 'create-product', component: CreateProductComponent},
  {path: 'register-user', component: RegisterUserComponent},
  {path: 'register-client', component: RegisterClientComponent},
  {path: 'all-users', component: AllUsersComponent},
  {path: 'notifications', component: NotificationsComponent},




  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
