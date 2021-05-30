import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EdicaoHorarioAtendimentoFORM } from './../model/edicao-horario-atendimento.form';
import { HorarioAtendimentoFORM } from '../model/horario-atendimento.form';
import { HorarioAtendimento } from '../model/horario-atendimento.model';
import { DadosEnum } from 'src/app/shared/model/dados-enum.model';

@Injectable({
  providedIn: 'root'
})

export class HorarioAtendimentoService {

  constructor(private http: HttpClient) { }


  public listarHorariosAtendimento(): Observable<HorarioAtendimento[]> {
    return this.http.get<HorarioAtendimento[]>(`/horario-atendimento`);
  }

  public listarDiasDaSemanaDisponiveisParaCadastro(): Observable<DadosEnum[]> {
    return this.http.get<DadosEnum[]>(`/horario-atendimento/dias-semana-para-cadastro`);
  }

  public cadastrarDiaDeAtendimento(horariosDeUmDiaAtendimento: HorarioAtendimentoFORM): Observable<any> {
    return this.http.post(`/horario-atendimento`, horariosDeUmDiaAtendimento);
  }

  public atualizarHorariosDeUmDiaDaSamana(idDiaAtendimento: number, edicaoHorariosDeUmDiaAtendimento: EdicaoHorarioAtendimentoFORM)
    : Observable<any> {
    return this.http.put(`/horario-atendimento/${idDiaAtendimento}`, edicaoHorariosDeUmDiaAtendimento);
  }

  public excluirUmDiaDeAtendimento(idDiaAtendimento: number): Observable<any> {
    return this.http.delete(`/horario-atendimento/${idDiaAtendimento}`);
  }
}
