import { InformacoesPreviasConsultaRetorno } from './../../../tabela-consultas-retornos/shared/model/informacoes-previas-consulta-retorno.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
