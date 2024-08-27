import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ProductModule } from './product/product.module';
import { CommonElementsModule } from './common/common.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from '../material/material/material.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { SellerModule } from './seller/seller.module';
import { DelivererModule } from './deliverer/deliverer.module';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from './auth/interceptor/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ProductModule,
    CommonElementsModule,
    HttpClientModule, /*AAAAA ZAR JE MOGUCE DA JE SAMO OVO FALILO AAAA */
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AdminModule,
    ClientModule,
    SellerModule,
    DelivererModule,
    AuthModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',  
      preventDuplicates: true,
      timeOut: 3000,  
      progressBar: true, 
      progressAnimation: 'increasing',  
      closeButton: true,  
      newestOnTop: true,  
    }),
    
    
    
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
