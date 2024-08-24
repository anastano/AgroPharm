import { Component, OnInit } from '@angular/core';
import { CurrentUser } from '../../auth/model/auth.model';
import { AuthService } from '../../auth/auth.service';
import { ACCESS_TOKEN } from '../../auth/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  public currentUser: CurrentUser | undefined;

  constructor(private authService: AuthService, private router: Router){}

  async ngOnInit(): Promise<void> {
    if (window.localStorage.getItem(ACCESS_TOKEN)) {
      await this.authService.setCurrentUser();
    }

    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        console.log("User(navbar): ", user.email, " Role: ", user.role);
        this.currentUser = user;
      }
    });
  }

  onLogout(): void {
    this.authService.logout();
  }

}
