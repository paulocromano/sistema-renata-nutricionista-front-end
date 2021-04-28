import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HistoricoSocial } from './../model/historico-social.model';
import { ServidorService } from './../../../../shared/service/servidor.service';
import { InformacoesPreviasHistoricosSociais } from '../model/informacoes-previas-historicos-sociais.model';

@Injectable({
  providedIn: 'root'
})

export class HistoricoSocialService {

  constructor(private http: HttpClient, private servidorService: ServidorService) { }


  public buscarInformacoesPreviasHistoricosSociaisDoPaciente(idPaciente: number): Observable<InformacoesPreviasHistoricosSociais> {
    return this.http.get<InformacoesPreviasHistoricosSociais>(
      `${this.servidorService.getServidorBackEnd()}/historico-social-paciente/historicos/${idPaciente}`);
  }

  public buscarHistoricoSocialDoPaciente(idHistoricoSocial: number): Observable<HistoricoSocial> {
    return this.http.get<HistoricoSocial>(`${this.servidorService.getServidorBackEnd()}/historico-social-paciente/${idHistoricoSocial}`);
  }

  public excluirHistoricoSocialDoPaciente(idHistoricoSocial: number): Observable<any> {
    return this.http.delete(`${this.servidorService.getServidorBackEnd()}/historico-social-paciente/${idHistoricoSocial}`);
  }
}
