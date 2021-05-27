import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ParametrosAtendimento } from './../model/parametros-atendimento.model';

@Injectable({
  providedIn: 'root'
})

export class ParametrosAtendimentoService {

  constructor(private http: HttpClient) { }


  public buscarParametrosAtendimento(): Observable<ParametrosAtendimento> {
    return this.http.get<ParametrosAtendimento>(`/parametros-atendimento`);
  }
}
