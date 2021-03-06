import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { QuestionarioFrequenciaAlimentarFORM } from './../model/questionario-frequencia-alimentar.form';
import { QuestionarioFrequenciaAlimentar } from './../model/questionario-frequencia-alimentar.model';
import { InformacoesPreviasQuestionarios } from './../model/informacoes-previas-questionarios.model';

@Injectable({
  providedIn: 'root'
})

export class QuestionarioFrequenciaAlimentarService {

  constructor(private http: HttpClient) { }


  public buscarInformacoesPreviasQuestionariosDoPaciente(idPaciente: number): Observable<InformacoesPreviasQuestionarios> {
    return this.http.get<InformacoesPreviasQuestionarios>(`/questionario-frequencia-alimentar/informacoes-previas/${idPaciente}`);
  }

  public buscarQuestionarioFrequenciaAlimentarDoPaciente(idQuestionario: number): Observable<QuestionarioFrequenciaAlimentar> {
    return this.http.get<QuestionarioFrequenciaAlimentar>(`/questionario-frequencia-alimentar/${idQuestionario}`);
  }

  public cadastrarQuestionarioFrequenciaAlimentar(idPaciente: number, questionario: QuestionarioFrequenciaAlimentarFORM): Observable<any> {
    return this.http.post(`/questionario-frequencia-alimentar/${idPaciente}`, questionario);
  }

  public excluirQuestionarioFrequenciaAlimentar(idQuestionario: number): Observable<any> {
    return this.http.delete(`/questionario-frequencia-alimentar/${idQuestionario}`);
  }
}
