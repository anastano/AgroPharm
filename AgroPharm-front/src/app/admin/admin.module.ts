import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { MaterialModule } from '../../material/material/material.module';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RegisterUserComponent } from './register-user/register-user.component';


@NgModule({
  declarations: [
    AdminProfileComponent,
    AllOrdersComponent,
    RegisterUserComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule

  ]
})
export class AdminModule { }
