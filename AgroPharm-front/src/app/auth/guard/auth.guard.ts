import { Injectable } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../auth.service';
import { CurrentUser } from '../model/auth.model';

@Injectable({
    providedIn: 'root',
  })
export class AuthGuard implements CanActivate{
    constructor( private router: Router, private authService: AuthService ) {}


    canActivate(route: ActivatedRouteSnapshot): boolean {
        const requiredRoles = route.data['requiredRoles'] as string[];
        const user: CurrentUser = this.authService.getCurrentUser();

        if (user && user.email !== '') {
            return requiredRoles.some(role => user.role.includes(role));     
        } else {
            this.router.navigate(['']);
            return false;
        }

    }
    
}
