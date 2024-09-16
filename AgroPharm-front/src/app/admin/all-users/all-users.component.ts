import { Component, OnInit } from '@angular/core';
import { User, UserWRole } from '../../auth/model/auth.model';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent implements OnInit{
  users: UserWRole[] = [];
  userRole: string = '';

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.authService.getAllUsers().subscribe((data: UserWRole[]) => {
      this.users = data;
    });
  }

 

}
