import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { InformacoesHistoricosAtividadeFisica } from '../model/informacoes-historicos-atividade-fisica.model';
import { AtividadeFisicaFORM } from './../model/atividade-fisica.form';

@Injectable({
  providedIn: 'root'
})

export class HistoricoAtividadeFisicaService {

  constructor(private http: HttpClient) { }


  public buscarInformacoesHistoricosAtividadeFisicaDoPaciente(idPaciente: number): Observable<InformacoesHistoricosAtividadeFisica> {
    return this.http.get<InformacoesHistoricosAtividadeFisica>(`/atividade-fisica/informacoes-paciente/${idPaciente}`);
  }

  public cadastrarAtividadeFisicaDoPaciente(idPaciente: number, atividadeFisica: AtividadeFisicaFORM): Observable<any> {
    return this.http.post(`/atividade-fisica/${idPaciente}`, atividadeFisica);
  }

  public excluirHistoricoAtividadeFisica(idHistoricoAtividadeFisica: number): Observable<any> {
    return this.http.delete(`/atividade-fisica/${idHistoricoAtividadeFisica}`);
  }
}
