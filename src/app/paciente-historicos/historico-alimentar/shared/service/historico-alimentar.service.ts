import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ServidorService } from './../../../../shared/service/servidor.service';
import { HistoricoAlimentar } from './../model/historico-alimentar.model';
import { InformacoesPreviasHistoricosAlimentares } from './../model/informacoes-historicos-alimentares.model';

@Injectable({
  providedIn: 'root'
})

export class HistoricoAlimentarService {

  constructor(private http: HttpClient, private servidorService: ServidorService) { }


  public buscarInformacoesPreviasHistoricosAlimentaresDoPaciente(idPaciente: number): Observable<InformacoesPreviasHistoricosAlimentares> {
    return this.http.get<InformacoesPreviasHistoricosAlimentares>(
      `${this.servidorService.getServidorBackEnd()}/historico-alimentar/informacoes-previas/${idPaciente}`);
  }

  public buscarHistoricoAlimentarDoPaciente(idHistoricoAlimentar: number): Observable<HistoricoAlimentar> {
    return this.http.get<HistoricoAlimentar>(
      `${this.servidorService.getServidorBackEnd()}/historico-alimentar/paciente/${idHistoricoAlimentar}`);
  }

  public excluirHistoricoAlimentar(idHistoricoAlimentar: number): Observable<any> {
    return this.http.delete(`${this.servidorService.getServidorBackEnd()}/historico-alimentar/${idHistoricoAlimentar}`);
  }
}
