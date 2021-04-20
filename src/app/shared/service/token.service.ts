import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private JwtHelper: JwtHelperService) { }


  public armazenarToken(response: any): void {
    localStorage.clear();
    const token: string = response.headers.get('Authorization');
    console.log(token);
    localStorage.setItem('token', (token.startsWith('Bearer ')) ? token.substring(7) : null);
  }

  public isTokenInvalido(): boolean {
    const token: string = localStorage.getItem('token');
    return !token || this.JwtHelper.isTokenExpired(token); 
  }

  public getToken(): string {
    const token = localStorage.getItem('token');
    return (token.startsWith('Bearer ')) ? token.substring(7) : null;
  }
}
