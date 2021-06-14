import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Colaborador } from './../model/colaborador.model';
import { ColaboradorFORM } from './../model/colaborador.form';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  constructor(private http: HttpClient) { }


  public listarUsuariosEmOrdemAlfabetica(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(`/usuario`);
  }

  public cadastrarUsuario(formularioFuncionario: ColaboradorFORM): Observable<any> {
    return this.http.post(`/usuario`, formularioFuncionario);
  }

  public atualizarUsuario(id: number, formularioFuncionario: ColaboradorFORM): Observable<any> {
    return this.http.put(`/usuario/${id}`, formularioFuncionario);
  }

  public removerUsuario(id: number): Observable<any> {
    return this.http.delete(`/usuario/${id}`);
  }
}
