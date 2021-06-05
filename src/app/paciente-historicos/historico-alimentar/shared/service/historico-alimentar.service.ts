import { HistoricoAlimentarFORM } from './../model/historico-alimentar.form';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HistoricoAlimentar } from './../model/historico-alimentar.model';
import { InformacoesPreviasHistoricosAlimentares } from './../model/informacoes-historicos-alimentares.model';

@Injectable({
  providedIn: 'root'
})

export class HistoricoAlimentarService {

  constructor(private http: HttpClient) { }


  public buscarInformacoesPreviasHistoricosAlimentaresDoPaciente(idPaciente: number): Observable<InformacoesPreviasHistoricosAlimentares> {
    return this.http.get<InformacoesPreviasHistoricosAlimentares>(`/historico-alimentar/informacoes-previas/${idPaciente}`);
  }

  public buscarHistoricoAlimentarDoPaciente(idHistoricoAlimentar: number): Observable<HistoricoAlimentar> {
    return this.http.get<HistoricoAlimentar>(`/historico-alimentar/paciente/${idHistoricoAlimentar}`);
  }

  public cadastrarHistoricoAlimentarDoPaciente(idPaciente: number, historicoAlimentar: HistoricoAlimentarFORM): Observable<any> {
    return this.http.post(`/historico-alimentar/${idPaciente}`, historicoAlimentar);
  }

  public excluirHistoricoAlimentar(idHistoricoAlimentar: number): Observable<any> {
    return this.http.delete(`/historico-alimentar/${idHistoricoAlimentar}`);
  }
}
