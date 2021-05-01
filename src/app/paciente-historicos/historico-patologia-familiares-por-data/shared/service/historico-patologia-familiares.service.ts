import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HistoricoPatologiaFamiliaresPorData } from './../model/historico-patologia-familiares-por-data.model';
import { InformacoesPreviasHistoricosFamiliaresPorData } from './../model/informacoes-previas-historicos-familiares-data.model';

@Injectable({
  providedIn: 'root'
})

export class HistoricoPatologiaFamiliaresService {

  constructor(private http: HttpClient) { }


  public buscarInformacoesPreviasHistoricosPatologiasFamiliaresPorDataDoPaciente(idPaciente: number): 
    Observable<InformacoesPreviasHistoricosFamiliaresPorData> {

    return this.http.get<InformacoesPreviasHistoricosFamiliaresPorData>(
      `/historico-patologia-familiares-por-data/previa-historicos/${idPaciente}`);
  }

  public buscarHistoricoPatologiaFamiliaresPorDataDoPaciente(idPatologiaFamiliares: number): 
    Observable<HistoricoPatologiaFamiliaresPorData> {

    return this.http.get<HistoricoPatologiaFamiliaresPorData>(
      `/historico-patologia-familiares-por-data/paciente/${idPatologiaFamiliares}`);
  }

  public excluirHistoricoPatologiaFamiliaresPorData(idHistoricoPatologiaFamiliaresPorData: number): Observable<any> {
    return this.http.delete(
      `/historico-patologia-familiares-por-data/${idHistoricoPatologiaFamiliaresPorData}`);
  }
}
