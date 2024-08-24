import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { MaterialModule } from '../../material/material/material.module';



@NgModule({
  declarations: [
    ClientProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    
  ]
})
export class ClientModule { }
