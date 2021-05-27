import { ParametrosAtendimentoPacienteFORM } from './shared/model/parametros-atendimento-paciente.form';
import { ParametrosAtendimentoPaciente } from './shared/model/parametros-atendimento-paciente.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-parametros-atendimento-paciente',
  templateUrl: './parametros-atendimento-paciente.component.html',
  styleUrls: ['./parametros-atendimento-paciente.component.css']
})
export class ParametrosAtendimentoPacienteComponent implements OnInit {

  @Input() public parametrosAtendimentoPaciente: ParametrosAtendimentoPaciente;

  public formularioParametrosAtendimento: ParametrosAtendimentoPacienteFORM = new ParametrosAtendimentoPacienteFORM();
  public precoConsulta: number;

  constructor() { }

  ngOnInit(): void {
    this.formularioParametrosAtendimento = this.parametrosAtendimentoPaciente
    this.precoConsulta = parseFloat(this.parametrosAtendimentoPaciente.precoConsulta);
    console.log(this.parametrosAtendimentoPaciente)
  }
}
