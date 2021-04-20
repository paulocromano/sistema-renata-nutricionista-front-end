import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_CONFIG } from './../config/api-config';
import { CredenciaisUsuario } from './../../login/shared/model/credenciais-usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }


  public autenticarUsuario(credenciaisUsuario: CredenciaisUsuario): Observable<any> {
    return this.http.post(`${API_CONFIG.urlServidorBackEnd}/login`, credenciaisUsuario,
    {
      observe: 'response',
      responseType: 'text'
    });
  }
}
