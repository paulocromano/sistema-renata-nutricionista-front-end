import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Colaborador } from './../model/colaborador.model';
import { ColaboradorFORM } from './../model/colaborador.form';
import { AtualizacaoUsuarioFORM } from './../model/atualizacao-usuario.form';
import { AlteracaoSenhaFORM } from './../model/alteracao-senha.form';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  constructor(private http: HttpClient) { }


  public listarUsuariosEmOrdemAlfabetica(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(`/usuario`);
  }

  public buscarInformacoesUsuario(): Observable<Colaborador> {
    return this.http.get<Colaborador>(`/usuario/informacoes-usuario-logado`);
  }

  public cadastrarUsuario(formularioFuncionario: ColaboradorFORM): Observable<any> {
    return this.http.post(`/usuario`, formularioFuncionario);
  }

  public atualizarUsuario(formularioFuncionario: AtualizacaoUsuarioFORM): Observable<any> {
    return this.http.put(`/usuario`, formularioFuncionario);
  }

  public alterarSenha(formularioAlteracaoSenha: AlteracaoSenhaFORM): Observable<any> {
    return this.http.put(`/usuario/alterar-senha`, formularioAlteracaoSenha);
  }

  public removerUsuario(id: number): Observable<any> {
    return this.http.delete(`/usuario/${id}`);
  }
}
