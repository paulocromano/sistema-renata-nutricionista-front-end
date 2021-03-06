import { InformacoesCadastroConsulta } from './../model/informacoes-cadastro-consulta.model';
import { ConfirmacaoAtendimento } from './../../../tabela-consultas-retornos/shared/model/confirmacao-atendimento.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { InformacoesPreviasConsultaRetorno } from './../../../tabela-consultas-retornos/shared/model/informacoes-previas-consulta-retorno.model';
import { Consulta } from '../model/consulta.model';
import { TipoAtendimento } from './../../../tabela-consultas-retornos/shared/model/tipo-atendimento.enum';
import { ReagendamentoConsultaFORM } from './../model/reagendamento-consulta.form';
import { AgendamentoConsultaFORM } from './../model/agendamento-consulta.form';
import { ConfirmacaoConsultaFORM } from './../model/confirmacao-consulta.form';
import { ConsultaFORM } from './../model/consulta.form';

@Injectable({
  providedIn: 'root'
})

export class ConsultaService {

  constructor(private http: HttpClient) { }


  public listarAtendimentosAPartirDaDataAtual(): Observable<InformacoesPreviasConsultaRetorno[]> {
    return this.http.get<InformacoesPreviasConsultaRetorno[]>(`/consulta-paciente/listar-atendimentos-data-atual-posteriores`);
  }

  public listarAtendimentosAnterioresAoDiaAtual(): Observable<InformacoesPreviasConsultaRetorno[]> {
    return this.http.get<InformacoesPreviasConsultaRetorno[]>(`/consulta-paciente/listar-atendimentos-anteriores-data-atual`);
  }

  public verificarProximoTipoDeAtendimentoDoPaciente(idPaciente: number): Observable<TipoAtendimento> {
    return this.http.get<TipoAtendimento>(`/consulta-paciente/proximo-tipo-atendimento/${idPaciente}`);
  }

  public informacoesParaConfirmacaoDeAtendimento(): Observable<ConfirmacaoAtendimento> {
    return this.http.get<ConfirmacaoAtendimento>(`/consulta-paciente/informacoes-confirmacao-atendimento`);
  }

  public buscarConsultaDoPaciente(idConsulta: number): Observable<Consulta> {
    return this.http.get<Consulta>(`/consulta-paciente/buscar/${TipoAtendimento.CONSULTA.valueOf()}/${idConsulta}`);
  }

  public agendarConsulta(idPaciente: number, agendamentoConsulta: AgendamentoConsultaFORM): Observable<any> {
    return this.http.post(`/consulta-paciente/agendar/${idPaciente}`, agendamentoConsulta);
  }

  public reagendarConsulta(idPaciente: number, idConsulta: number, reagendamentoConsulta: ReagendamentoConsultaFORM): Observable<any> {
    return this.http.put(`/consulta-paciente/reagendar/${idPaciente}/${idConsulta}`, reagendamentoConsulta);
  }

  public confirmarConsulta(idPaciente: number, idConsulta: number, confirmacaoConsulta: ConfirmacaoConsultaFORM): Observable<any> {
    return this.http.put(`/consulta-paciente/confirmar/${idPaciente}/${idConsulta}`, confirmacaoConsulta);
  }

  public cancelarConsulta(idPaciente: number, idConsulta: number): Observable<any> {
    return this.http.delete(`/consulta-paciente/cancelar/${idPaciente}/${idConsulta}`);
  }

  public iniciarConsulta(idPaciente: number, idConsulta: number): Observable<any> {
    return this.http.put(`/consulta-paciente/iniciar/${idPaciente}/${idConsulta}`, null);
  }

  public informacoesParaCadastrarConsulta(idPaciente: number, idConsulta: number): Observable<InformacoesCadastroConsulta> {
    return this.http.get<InformacoesCadastroConsulta>(`/consulta-paciente/informacoes-cadastro-consulta/${idPaciente}/${idConsulta}`);
  }

  public finalizarConsulta(idPaciente: number, idConsulta: number, formularioConsulta: ConsultaFORM): Observable<any> {
    return this.http.put(`/consulta-paciente/finalizar/${idPaciente}/${idConsulta}`, formularioConsulta);
  }
}
