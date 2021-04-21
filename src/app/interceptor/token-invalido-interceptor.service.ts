import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TokenService } from './../shared/service/token.service';
import { ServidorService } from './../shared/service/servidor.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInvalidoInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService, private servidorService: ServidorService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('token')) {
      if (this.tokenService.isTokenInvalido()) {
        window.location.href = this.servidorService.urlFrontAcessoNegado;
      }
    }
    
    return next.handle(req);
  }
}
