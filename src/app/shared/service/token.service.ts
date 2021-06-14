import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public jwtPayload: any = '';

  constructor(private JwtHelper: JwtHelperService) { }


  public armazenarToken(response: any): void {
    localStorage.clear();

    const token: string = response.headers.get('Authorization');
    localStorage.setItem('token', (token.startsWith('Bearer ')) ? token.substring(7) : null);
  }

  public carregarInformacoesToken(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.jwtPayload = this.JwtHelper.decodeToken(token);
      console.log(this.jwtPayload);
    }
  }

  public isTokenInvalido(): boolean {
    const token: string = localStorage.getItem('token');
    return !token || this.JwtHelper.isTokenExpired(token); 
  }

  public getToken(): string {
    const token = localStorage.getItem('token');
    return token;
  }

  public getPermissoes(): string[] {
    this.carregarInformacoesToken();
    const permissoesToken: any[] = this.jwtPayload.permissoes;
    
    return permissoesToken ? permissoesToken.map(permissao => permissao.authority) : null;
  }

  public contemPermissaoAdmin(): boolean {
    this.carregarInformacoesToken();
    const permissoesToken: any[] = this.jwtPayload.permissoes;

    return permissoesToken ? new Boolean(permissoesToken.filter(permissao => permissao.authority === 'ROLE_ADMIN')).valueOf() : false;
  }

  public apagarToken(): void {
    localStorage.clear();
  }
}
