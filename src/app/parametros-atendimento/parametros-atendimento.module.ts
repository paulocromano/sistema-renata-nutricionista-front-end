import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';

import { ToastyModule } from './../shared/toasty/toasty.module';
import { PaginaParametrosAtendimentoComponent } from './pagina-parametros-atendimento/pagina-parametros-atendimento.component';
import { ParametrosAtendimentoPacienteComponent } from './parametros-atendimento-paciente/parametros-atendimento-paciente.component';
import { ParametrosHorarioAtendimentoComponent } from './parametros-horario-atendimento/parametros-horario-atendimento.component';


@NgModule({
  declarations: [
    PaginaParametrosAtendimentoComponent,
    ParametrosAtendimentoPacienteComponent,
    ParametrosHorarioAtendimentoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ProgressSpinnerModule,
    DialogModule,
    TooltipModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    ToastyModule
  ]
})

export class ParametrosAtendimentoModule { }
