import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SuplementoFORM } from './../model/suplemento.form';
import { Suplemento } from './../model/suplemento.model';

@Injectable({
  providedIn: 'root'
})
export class SuplementoService {

  constructor(private http: HttpClient) { }


  public listarSuplementosEmOrdemAlfabetica(): Observable<Suplemento[]> {
    return this.http.get<Suplemento[]>(`/suplemento`);
  }

  public cadastrarSuplemento(suplemento: SuplementoFORM): Observable<any> {
    return this.http.post(`/suplemento`, suplemento);
  }

  public alterarSuplemento(idSuplemento: number, suplemento: SuplementoFORM): Observable<any> {
    return this.http.put(`/suplemento/${idSuplemento}`, suplemento);
  }

  public excluirSuplemento(idSuplemento: number): Observable<any> {
    return this.http.delete(`/suplemento/${idSuplemento}`);
  }
}
