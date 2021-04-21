import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { ServidorService } from './../service/servidor.service';
import { TokenService } from './../service/token.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(private tokenService: TokenService, private servidorService: ServidorService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const permissoesToken: string[] = this.tokenService.getPermissoes();

    if (this.tokenService.isTokenInvalido()) {
      window.location.href = this.servidorService.urlFrontAcessoNegado;
      return false;
    }
    else {
      if (permissoesToken) {
        if (!permissoesToken.includes(this.servidorService.regraAcessoAdmin)) {
          window.location.href = this.servidorService.urlFrontAcessoNegado;
          return false;
        }

        return true;
      }
      else {
        window.location.href = this.servidorService.urlFrontAcessoNegado;
        return false;
      }
    }
  }
}
