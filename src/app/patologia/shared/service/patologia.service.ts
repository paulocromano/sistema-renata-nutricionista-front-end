import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PatologiaFORM } from './../model/patologia.form';
import { Patologia } from './../model/patologia.model';

@Injectable({
  providedIn: 'root'
})

export class PatologiaService {

  constructor(private http: HttpClient) { }


  public listarPatologiasEmOrdemAlfabetica(): Observable<Patologia[]> {
    return this.http.get<Patologia[]>(`/patologia`);
  }

  public cadastrarPatologia(patologia: PatologiaFORM): Observable<any> {
    return this.http.post(`/patologia`, patologia);
  }

  public alterarPatologia(idPatologia: number, patologia: PatologiaFORM): Observable<any> {
    return this.http.put(`/patologia/${idPatologia}`, patologia);
  }

  public excluirPatologia(idPatologia: number): Observable<any> {
    return this.http.delete(`/patologia/${idPatologia}`);
  }
}
