import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Paciente } from './../model/paciente.model';
import { ServidorService } from './../../../shared/service/servidor.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient, private servidorService: ServidorService) { }

  public buscarPacientesEmOrdemAlfabetica(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.servidorService.getServidorBackEnd()}/paciente`);
  }
}
