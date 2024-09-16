import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../../material/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterClientComponent } from './register-client/register-client.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterClientComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  exports: [
    MaterialModule
  ]
})
export class AuthModule { }
