import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MedicamentoFORM } from './../model/medicamento.form';
import { Medicamento } from './../model/medicamento.model';

@Injectable({
  providedIn: 'root'
})

export class MedicamentoService {

  constructor(private http: HttpClient) { }


  public listarMedicamentosEmOrdemAlfabetica(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(`/medicamento`);
  }

  public cadastrarMedicamento(medicamento: MedicamentoFORM): Observable<any> {
    return this.http.post(`/medicamento`, medicamento);
  }

  public alterarMedicamento(idMedicamento: number, medicamento: MedicamentoFORM): Observable<any> {
    return this.http.put(`/medicamento/${idMedicamento}`, medicamento);
  }

  public excluirMedicamento(idMedicamento: number): Observable<any> {
    return this.http.delete(`/medicamento/${idMedicamento}`);
  }
}
