import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { LoginService } from '../services/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authService = this.injector.get(LoginService);
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getAuthData()?.token}`
      }
    });
    return next.handle(tokenizedReq);
  }
}