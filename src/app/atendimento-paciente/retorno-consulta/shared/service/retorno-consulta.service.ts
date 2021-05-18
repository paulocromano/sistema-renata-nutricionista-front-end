import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RetornoConsultaFORM } from './../model/retorno-consulta.form';
import { ReagendamentoRetornoFORM } from './../model/reagendamento-retorno-consulta.form';
import { AgendamentoRetornoFORM } from './../model/agendamento-retorno-consulta.form';
import { TipoAtendimento } from './../../../tabela-consultas-retornos/shared/model/tipo-atendimento.enum';
import { RetornoConsulta } from './../model/retorno-consulta.model';

@Injectable({
  providedIn: 'root'
})

export class RetornoConsultaService {

  constructor(private http: HttpClient) { }


  public buscarRetornoConsultaDoPaciente(idRetornoConsulta: number): Observable<RetornoConsulta> {
    return this.http.get<RetornoConsulta>(`/retorno-consulta-paciente/buscar/
      ${TipoAtendimento.RETORNO_CONSULTA.valueOf()}/${idRetornoConsulta}`);
  }

  public agendarRetorno(idPaciente: number, agendamentoRetorno: AgendamentoRetornoFORM): Observable<any> {
    return this.http.post(`/retorno-consulta-paciente/agendar/${idPaciente}`, agendamentoRetorno);
  }

  public reagendarRetorno(idPaciente: number, idRetornoConsulta: number, reagendamentoRetorno: ReagendamentoRetornoFORM): Observable<any> {
    return this.http.put(`/retorno-consulta-paciente/reagendar/${idPaciente}/${idRetornoConsulta}`, reagendamentoRetorno);
  }

  public confirmarRetornoConsulta(idPaciente: number, idRetornoConsulta: number): Observable<any> {
    return this.http.put(`/retorno-consulta-paciente/confirmar/${idPaciente}/${idRetornoConsulta}`, null);
  }

  public cancelarRetornoConsulta(idPaciente: number, idRetornoConsulta: number): Observable<any> {
    return this.http.delete(`/retorno-consulta-paciente/cancelar/${idPaciente}/${idRetornoConsulta}`);
  }

  public iniciarRetornoConsulta(idPaciente: number, idRetornoConsulta: number): Observable<any> {
    return this.http.put(`/retorno-consulta-paciente/iniciar/${idPaciente}/${idRetornoConsulta}`, null);
  }

  public finalizarRetornoConsulta(idPaciente: number, idRetornoConsulta: number, 
    formularioRetornoConsulta: RetornoConsultaFORM): Observable<any> {

    return this.http.put(`/retorno-consulta-paciente/finalizar/${idPaciente}/${idRetornoConsulta}`, formularioRetornoConsulta);
  }
}
