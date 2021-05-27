import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';

import { ToastyModule } from './../shared/toasty/toasty.module';
import { ParametrosAtendimentoPacienteComponent } from './parametros-atendimento-paciente.component';

@NgModule({
  declarations: [ ParametrosAtendimentoPacienteComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ProgressSpinnerModule,
    InputNumberModule,
    TooltipModule,
    ToastyModule
  ]
})

export class ParametrosAtendimentoPacienteModule { }
