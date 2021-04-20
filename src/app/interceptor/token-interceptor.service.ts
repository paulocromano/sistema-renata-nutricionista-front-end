import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TokenService } from '../shared/service/token.service';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.tokenService.getToken();
    let requestRetorno: HttpRequest<any>;

    if (token) {
      requestRetorno = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
    }
    else {
      requestRetorno = req.clone();
    }

    return next.handle(requestRetorno);
  }
}
