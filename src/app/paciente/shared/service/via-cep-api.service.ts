import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EnderecoFORM } from './../model/endereco.form';

@Injectable({
  providedIn: 'root'
})
export class ViaCEPApiService {

  constructor(private http: HttpClient) { }


  public buscarEnderecoConformeCEP(cep: string): Observable<EnderecoFORM> {
    return this.http.get<EnderecoFORM>(`viacep.com.br/ws/${cep}/json/`);
  }
}
