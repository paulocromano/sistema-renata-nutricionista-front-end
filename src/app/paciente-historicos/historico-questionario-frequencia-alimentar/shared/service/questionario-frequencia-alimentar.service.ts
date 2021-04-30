import { QuestionarioFrequenciaAlimentar } from './../model/questionario-frequencia-alimentar.model';
import { InformacoesPreviasQuestionarios } from './../model/informacoes-previas-questionarios.model';
import { Observable } from 'rxjs';
import { ServidorService } from './../../../../shared/service/servidor.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionarioFrequenciaAlimentarService {

  constructor(private http: HttpClient, private servidorService: ServidorService) { }


  public buscarInformacoesPreviasQuestionariosDoPaciente(idPaciente: number): Observable<InformacoesPreviasQuestionarios> {
    return this.http.get<InformacoesPreviasQuestionarios>(
      `${this.servidorService.getServidorBackEnd()}/questionario-frequencia-alimentar/informacoes-previas/${idPaciente}`);
  }

  public buscarQuestionarioFrequenciaAlimentarDoPaciente(idQuestionario: number): Observable<QuestionarioFrequenciaAlimentar> {
    return this.http.get<QuestionarioFrequenciaAlimentar>(
      `${this.servidorService.getServidorBackEnd()}/questionario-frequencia-alimentar/${idQuestionario}`);
  }

  public excluirQuestionarioFrequenciaAlimentar(idQuestionario: number): Observable<any> {
    return this.http.delete(`${this.servidorService.getServidorBackEnd()}/questionario-frequencia-alimentar/${idQuestionario}`);
  }
}
