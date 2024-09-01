import { Component, EventEmitter, Output } from '@angular/core';
import { Address } from '../../auth/model/auth.model';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css'
})
export class AddressFormComponent {
  @Output() addressSubmitted = new EventEmitter<Address>();
  address: Address = { street: '', streetNumber: '', city: '', country: '', postalCode: '' };

  submitAddress() {
    this.addressSubmitted.emit(this.address);
  }
}
