import { Endereco } from './../model/endereco.model';
import { ServidorService } from './../../../shared/service/servidor.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private http: HttpClient, private servidorService: ServidorService) { }

  public buscarEnderecoConformeCEP(cep: string): Observable<Endereco> {
    return this.http.get<Endereco>(`${this.servidorService.getServidorBackEnd()}/endereco/api-via-cep/${cep}`);
  }
}
