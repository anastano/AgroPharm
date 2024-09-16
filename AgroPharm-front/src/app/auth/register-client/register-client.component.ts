import { Component } from '@angular/core';
import { UserRegistration } from '../model/auth.model';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrl: './register-client.component.css'
})
export class RegisterClientComponent {
  user: UserRegistration = {
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    street: '',
    streetNumber: '',
    city: '',
    country: '',
    postalCode: '',
    isSenior: false,
    userType: 'client'
  };

  constructor(private authStervice: AuthService, private toastr: ToastrService) {}

  onSubmit() {
    this.authStervice.registerUser(this.user).subscribe(
      response => {
        console.log('User successfully registered', response);
        this.toastr.success('Korisnik uspešno registrovan!', 'Uspeh');
      },
      error => {
        console.error('Error registering user', error);
        this.toastr.success('Korisnik uspešno registrovan!', 'Uspeh');
      }
    );
  }
}
