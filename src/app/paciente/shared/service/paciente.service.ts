import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ListagemCadastroPaciente } from './../model/listagem-cadastro-paciente.model';
import { PacienteFORM } from './../model/paciente.form';
import { EdicaoPacienteFORM } from './../model/edicao-paciente.form';
import { HistoricosPaciente } from './../../../paciente-historicos/informacoes-historicos/shared/model/historicos-paciente.model';
import { PacienteAgendamentoAtendimento } from './../model/paciente-agendamento-atendimento.model';

@Injectable({
  providedIn: 'root'
})

export class PacienteService {

  constructor(private http: HttpClient) { }

  
  public buscarInformacoesListagemCadastroPaciente(): Observable<ListagemCadastroPaciente> {
    return this.http.get<ListagemCadastroPaciente>(`/paciente/informacoes-listagem-cadastro`);
  }

  public buscarPacientesParaAgendarAtendimento(): Observable<PacienteAgendamentoAtendimento[]> {
    return this.http.get<PacienteAgendamentoAtendimento[]>(`/paciente/agendamento-atendimento`);
  }

  public buscarInformacoesHistoricosPaciente(idPaciente: number): Observable<HistoricosPaciente> {
    return this.http.get<HistoricosPaciente>(`/paciente/informacoes-previas-historicos/${idPaciente}`);
  }

  public cadastrarPaciente(paciente: PacienteFORM): Observable<any> {
    return this.http.post(`/paciente`, paciente);
  }

  public editarPaciente(idPaciente: number, paciente: EdicaoPacienteFORM): Observable<any> {
    return this.http.put(`/paciente/${idPaciente}`, paciente);
  }

  public excluirPaciente(idPaciente: number): Observable<any> {
    return this.http.delete(`/paciente/${idPaciente}`);
  }
}
