import { AgendamentoConsultaFORM } from './../model/agendamento-consulta.form';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { InformacoesPreviasConsultaRetorno } from './../../../tabela-consultas-retornos/shared/model/informacoes-previas-consulta-retorno.model';
import { Consulta } from '../model/consulta.model';
import { TipoAtendimento } from './../../../tabela-consultas-retornos/shared/model/tipo-atendimento.enum';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private http: HttpClient) { }


  public listarAtendimentosPorPeriodoPadrao(): Observable<InformacoesPreviasConsultaRetorno[]> {
    return this.http.get<InformacoesPreviasConsultaRetorno[]>(`/consulta-paciente/listar-atendimentos-periodo-padrao`);
  }

  public listarAtendimentosPorPeriodo(dataInicial: string, dataFinal: string): Observable<InformacoesPreviasConsultaRetorno[]> {
    return this.http.get<InformacoesPreviasConsultaRetorno[]>(`/consulta-paciente/listar-atendimentos-por-periodo
      ?dataInicial=${dataInicial}&dataFinal=${dataFinal}`);
  }

  public buscarConsultaDoPaciente(idConsulta: number): Observable<Consulta> {
    return this.http.get<Consulta>(`/consulta-paciente/buscar/${TipoAtendimento.CONSULTA.valueOf()}/${idConsulta}`);
  }

  public agendarConsulta(idPaciente: number, agendamentoConsulta: AgendamentoConsultaFORM): Observable<any> {
    return this.http.post(`/consulta-paciente/agendar/${idPaciente}`, agendamentoConsulta);
  }
}
