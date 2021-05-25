import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginaParametrosAtendimentoComponent } from './pagina-parametros-atendimento/pagina-parametros-atendimento.component';
import { ParametrosAtendimentoPacienteComponent } from './parametros-atendimento-paciente/parametros-atendimento-paciente.component';
import { ParametrosHistoricosPacienteComponent } from './parametros-historicos-paciente/parametros-historicos-paciente.component';
import { ParametrosHorarioAtendimentoComponent } from './parametros-horario-atendimento/parametros-horario-atendimento.component';


@NgModule({
  declarations: [
    PaginaParametrosAtendimentoComponent,
    ParametrosAtendimentoPacienteComponent,
    ParametrosHistoricosPacienteComponent,
    ParametrosHorarioAtendimentoComponent
  ],
  imports: [
    CommonModule
  ]
})

export class ParametrosAtendimentoModule { }
