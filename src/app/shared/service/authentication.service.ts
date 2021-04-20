import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CredenciaisUsuario } from './../../login/shared/model/credenciais-usuario.model';
import { ServidorService } from './servidor.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private servidorService: ServidorService) { }


  public autenticarUsuario(credenciaisUsuario: CredenciaisUsuario): Observable<any> {
    return this.http.post(`${this.servidorService.getServidorBackEnd()}/login`, credenciaisUsuario,
    {
      observe: 'response',
      responseType: 'text'
    });
  }
}
