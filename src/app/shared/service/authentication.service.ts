import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CredenciaisUsuario } from './../../login/shared/model/credenciais-usuario.model';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private http: HttpClient) { }


  public autenticarUsuario(credenciaisUsuario: CredenciaisUsuario): Observable<any> {
    return this.http.post(`/login`, credenciaisUsuario,
    {
      observe: 'response',
      responseType: 'text'
    });
  }
}
