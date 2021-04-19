import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../../../shared/api-config';
import { CredenciaisUsuario } from './../model/credenciais-usuario.model';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient) { }


  public efetuarLoginUsuario(credenciaisUsuario: CredenciaisUsuario): Observable<any> {
    return this.http.post(`${API_CONFIG.urlServidorBackEnd}/login`, credenciaisUsuario);
  }
}
