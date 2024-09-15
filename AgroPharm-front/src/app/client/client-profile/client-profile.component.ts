import { Component, OnInit } from '@angular/core';
import { Address, User } from '../../auth/model/auth.model';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css'
})
export class ClientProfileComponent implements OnInit {
  user: User | undefined;
  isEditing = false;

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: User) => {
      this.user = user;
    });
  }

  toggleEdit(): void {
    this.isEditing = true;
  }

  saveChanges(): void {
    if (this.user){
      this.authService.updateUser(this.user).subscribe(
        () => {
          this.isEditing = false;
          this.toastr.success('Podaci uspešno izmenjeni!', 'Uspeh');
        },
        (error) => {
          this.toastr.error('Došlo je do greške prilikom čuvanja.', 'Greška');
        }
      );
    } else {
      this.toastr.error('Podaci o korisniku nisu učitani.', 'Greška' );
    }
  }
  

  cancelEdit(): void {
    this.isEditing = false;
    this.ngOnInit(); 
  }
}
