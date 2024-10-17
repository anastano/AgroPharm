import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { UserRegistration } from '../../auth/model/auth.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
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
    userType: ''
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
