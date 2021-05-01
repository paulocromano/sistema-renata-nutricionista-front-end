import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HistoricoSocial } from './../model/historico-social.model';
import { InformacoesPreviasHistoricosSociais } from '../model/informacoes-previas-historicos-sociais.model';

@Injectable({
  providedIn: 'root'
})

export class HistoricoSocialService {

  constructor(private http: HttpClient) { }


  public buscarInformacoesPreviasHistoricosSociaisDoPaciente(idPaciente: number): Observable<InformacoesPreviasHistoricosSociais> {
    return this.http.get<InformacoesPreviasHistoricosSociais>(`/historico-social/previa-historicos-paciente/${idPaciente}`);
  }

  public buscarHistoricoSocialDoPaciente(idHistoricoSocial: number): Observable<HistoricoSocial> {
    return this.http.get<HistoricoSocial>(`/historico-social/${idHistoricoSocial}`);
  }

  public excluirHistoricoSocialDoPaciente(idHistoricoSocial: number): Observable<any> {
    return this.http.delete(`/historico-social/${idHistoricoSocial}`);
  }
}
