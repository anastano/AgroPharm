import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatOptionModule,
    MatMenuModule
  ],
  exports: [
    MatToolbar,
    MatButton,
    MatFormField,
    MatDialogModule,
    MatButtonToggleModule,
    MatCard,
    MatCheckbox,
    MatLabel,
    MatInput,
    MatTable,
    MatIconButton,
    MatIcon,
    MatListModule,
    MatSelectModule,
    MatOptionModule,
    MatMenuModule
  ]
})
export class MaterialModule { }
