import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CalendarioAtendimentoPacienteFORM } from './../model/calendario-atendimento-paciente.form';
import { PeriodoAtendimentoFORM } from './../model/periodo-atendimento.form';
import { PeriodoAtendimento } from '../model/periodo-atendimento.model';

@Injectable({
  providedIn: 'root'
})

export class CalendarioAtendimentoService {

  constructor(private http: HttpClient) { }


  public buscarHorariosDisponiveisParaDiaDoAgendamentoDeAtendimento(data: string): Observable<PeriodoAtendimento[]> {
    return this.http.get<PeriodoAtendimento[]>(`/calendario-atendimento-paciente/horarios-disponiveis?data=${data}`);
  }

  public listarPeriodosAPartirDoDiaAtual(): Observable<PeriodoAtendimento[]> {
    return this.http.get<PeriodoAtendimento[]>(`/calendario-atendimento-paciente`);
  }

  public cadastrarUmPeriodoNoCalendario(periodo: PeriodoAtendimentoFORM): Observable<any> {
    return this.http.post(`/calendario-atendimento-paciente/cadastrar-periodo`, periodo);
  }

  public cadastrarPeriodosAutomaticamenteNoCalendarioParaAtendimentoPaciente(): Observable<any> {
    return this.http.post(`/calendario-atendimento-paciente/cadastrar-periodos-automaticamente`, null);
  }

  public cadastrarPeriodosManualmenteNoCalendarioParaAtendimentoPaciente(calendario: CalendarioAtendimentoPacienteFORM): Observable<any> {
    return this.http.post(`/calendario-atendimento-paciente/cadastrar-periodos-manualmente`, calendario);
  }

  public excluirPeriodo(idPeriodo: number): Observable<any> {
    return this.http.delete(`/calendario-atendimento-paciente/excluir-periodo/${idPeriodo}`);
  }

  public excluirPeriodosConformeDataInicialFinal(dataInicio: string, dataFim: string): Observable<any> {
    return this.http.delete(`/calendario-atendimento-paciente/excluir-periodos?dataInicio=${dataInicio}&dataFim=${dataFim}`);
  }
}
