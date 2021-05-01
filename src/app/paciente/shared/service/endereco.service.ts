import { Endereco } from './../model/endereco.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EnderecoService {

  constructor(private http: HttpClient) { }

  public buscarEnderecoConformeCEP(cep: string): Observable<Endereco> {
    return this.http.get<Endereco>(`/endereco/api-via-cep/${cep}`);
  }
}
