import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ParametrosAtendimentoPaciente } from './../model/parametros-atendimento-paciente.model';
import { ParametrosAtendimentoPacienteFORM } from './../model/parametros-atendimento-paciente.form';

@Injectable({
  providedIn: 'root'
})

export class ParametrosAtendimentoPacienteService {

  constructor(private http: HttpClient) { }

  
  public buscarInformacoesDosParametrosDeAtendimentoDePaciente(): Observable<ParametrosAtendimentoPaciente> {
    return this.http.get<ParametrosAtendimentoPaciente>(`/atendimento-paciente-parametro`);
  }

  public atualizarParametrosAtendimentoDoPaciente(parametrosAtendimentoPaciente: ParametrosAtendimentoPacienteFORM): Observable<any> {
    return this.http.put(`/atendimento-paciente-parametro`, parametrosAtendimentoPaciente);
  }
}
