import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ProductModule } from './product/product.module';
import { CommonElementsModule } from './common/common.module';
import { HttpClientModule } from '@angular/common/http';

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

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
