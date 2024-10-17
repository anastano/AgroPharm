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
  clients: UserWRole[] = [];
  workers: UserWRole[] = [];
  roleTranslations: any = {
    'ADMIN': 'Administrator',
    'DELIVERER': 'Dostavljač',
    'SELLER': 'Prodavac',
    'CLIENT': 'Klijent'
  };

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.authService.getAllUsers().subscribe((data: UserWRole[]) => {
      this.users = data;
      this.splitUsersByRole();
    });
  }

  splitUsersByRole() {
    this.clients = this.users.filter(user => user.role.name === 'CLIENT');
    this.workers = this.users.filter(user => user.role.name !== 'CLIENT');
  }

}
