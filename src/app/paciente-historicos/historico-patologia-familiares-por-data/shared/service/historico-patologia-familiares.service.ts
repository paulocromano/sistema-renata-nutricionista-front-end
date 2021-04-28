import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HistoricoPatologiaFamiliaresPorData } from './../model/historico-patologia-familiares-por-data.model';
import { ServidorService } from './../../../../shared/service/servidor.service';
import { InformacoesPreviasHistoricosFamiliaresPorData } from './../model/informacoes-previas-historicos-familiares-data.model';

@Injectable({
  providedIn: 'root'
})

export class HistoricoPatologiaFamiliaresService {

  constructor(private http: HttpClient, private servidorService: ServidorService) { }


  public buscarInformacoesPreviasHistoricosPatologiasFamiliaresPorDataDoPaciente(idPaciente: number): 
    Observable<InformacoesPreviasHistoricosFamiliaresPorData> {

    return this.http.get<InformacoesPreviasHistoricosFamiliaresPorData>(
      `${this.servidorService.getServidorBackEnd()}/historico-patologia-familiares-por-data/previa-historicos/${idPaciente}`);
  }

  public buscarHistoricoPatologiaFamiliaresPorDataDoPaciente(idPatologiaFamiliares: number): 
    Observable<HistoricoPatologiaFamiliaresPorData> {

    return this.http.get<HistoricoPatologiaFamiliaresPorData>(
      `${this.servidorService.getServidorBackEnd()}/historico-patologia-familiares-por-data/paciente/${idPatologiaFamiliares}`);
  }

  public excluirHistoricoPatologiaFamiliaresPorData(idHistoricoPatologiaFamiliaresPorData: number): Observable<any> {
    return this.http.delete(
      `${this.servidorService.getServidorBackEnd()}/historico-patologia-familiares-por-data/${idHistoricoPatologiaFamiliaresPorData}`);
  }
}
