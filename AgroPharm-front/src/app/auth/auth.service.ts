import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorage } from './interceptor/token.service';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { AuthenticationResponse, CurrentUser, Login, User, UserRegistration, UserWRole } from './model/auth.model';
import * as JwtHelperService from "jwt-decode";
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser$ = new BehaviorSubject<CurrentUser>({email: "", role: "" });

  constructor(private http: HttpClient, private router: Router, private tokenStorage: TokenStorage) { }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }

  login(login: Login): Observable<AuthenticationResponse> {
    return this.http
    .post<AuthenticationResponse>(environment.apiHost +'auth/login', login)
    .pipe(
      tap((authenticationResponse) => {
        this.tokenStorage.saveAccessToken(authenticationResponse.accessToken);
      this.setCurrentUser();
    })
    );
  }

  setCurrentUser(): void{
    //const jwtHelperService = new JwtHelperService();
    const accessToken = this.tokenStorage.getAccessToken() || "";
    const currentUser: CurrentUser = {
      email: this.getDecodedAccessToken(accessToken).sub,
      role: this.getDecodedAccessToken(accessToken).role
    };
    console.log("User email:", currentUser.email, "User role:", currentUser.role);
    this.currentUser$.next(currentUser);
  }

  getCurrentUser(): CurrentUser{
    //const jwtHelperService = new JwtHelperService();
    const accessToken = this.tokenStorage.getAccessToken() || "";
    const currentUser: CurrentUser = {
      email: this.getDecodedAccessToken(accessToken).sub,
      role: this.getDecodedAccessToken(accessToken).role
    };
    console.log("User email:", currentUser.email, "User role:", currentUser.role);
    return currentUser;
  }

  logout(): void {
    this.router.navigate(['/']).then(_ => {
      this.tokenStorage.clear();
      this.currentUser$.next({email: "", role: "" });
    }
    );
  }

  getUser(): Observable<User> {
    return this.http.get<User>(environment.apiHost + `users/current-user`);
  }  

  isAuthenticated(): boolean {
    const token = this.tokenStorage.getAccessToken();
    return !!token;
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(environment.apiHost + 'users/update', user);
  }

  registerUser(user: UserRegistration): Observable<any> {
    return this.http.post<any>(environment.apiHost + `users/register`, user);
  }

  getAllUsers(): Observable<UserWRole[]> {
    return this.http.get<UserWRole[]>(environment.apiHost + `users/all`);
  }
  
}