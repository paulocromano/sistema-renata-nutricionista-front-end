import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ListagemCadastroPaciente } from './../model/listagem-cadastro-paciente.model';
import { ServidorService } from './../../../shared/service/servidor.service';
import { PacienteFORM } from './../model/paciente.form';
import { EdicaoPacienteFORM } from './../model/edicao-paciente.form';

@Injectable({
  providedIn: 'root'
})

export class PacienteService {

  constructor(private http: HttpClient, private servidorService: ServidorService) { }

  
  public buscarInformacoesListagemCadastroPaciente(): Observable<ListagemCadastroPaciente> {
    return this.http.get<ListagemCadastroPaciente>(`${this.servidorService.getServidorBackEnd()}/paciente/informacoes-listagem-cadastro`);
  }

  public cadastrarPaciente(paciente: PacienteFORM): Observable<any> {
    return this.http.post(`${this.servidorService.getServidorBackEnd()}/paciente`, paciente);
  }

  public editarPaciente(idPaciente: number, paciente: EdicaoPacienteFORM): Observable<any> {
    return this.http.put(`${this.servidorService.getServidorBackEnd()}/paciente/${idPaciente}`, paciente);
  }

  public excluirPaciente(idPaciente: number): Observable<any> {
    return this.http.delete(`${this.servidorService.getServidorBackEnd()}/paciente/${idPaciente}`);
  }
}
