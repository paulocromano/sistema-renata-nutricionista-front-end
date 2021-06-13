import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputNumberModule } from 'primeng/inputnumber';

import { ToastyModule } from './../shared/toasty/toasty.module';
import { ParametrosAtendimentoPacienteComponent } from './parametros-atendimento-paciente.component';
import { DashboardModule } from './../dashboard/dashboard.module';

@NgModule({
  declarations: [ ParametrosAtendimentoPacienteComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ProgressSpinnerModule,
    InputNumberModule,
    ToastyModule,
    DashboardModule
  ]
})

export class ParametrosAtendimentoPacienteModule { }
