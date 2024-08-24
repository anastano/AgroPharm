import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent
} from '@angular/common/http';
import { AuthService } from '../auth.service';

import { Observable} from 'rxjs';
import { ACCESS_TOKEN } from '../constants';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem(ACCESS_TOKEN)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` 
        }
      });
    }
    return next.handle(request);
  }
}