import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';

import { ToastyModule } from './../shared/toasty/toasty.module';
import { TabelaPacientesComponent } from './tabela-pacientes/tabela-pacientes.component';
import { CadastroPacienteComponent } from './cadastro-paciente/cadastro-paciente.component';
import { EdicaoPacienteComponent } from './edicao-paciente/edicao-paciente.component';
import { DashboardModule } from './../dashboard/dashboard.module';

@NgModule({
  declarations: [ CadastroPacienteComponent, TabelaPacientesComponent, EdicaoPacienteComponent ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ProgressSpinnerModule,
    DialogModule,
    TooltipModule,
    RadioButtonModule,
    DropdownModule,
    InputMaskModule,
    ToastyModule,
    DashboardModule
  ],
  exports: [ CadastroPacienteComponent, EdicaoPacienteComponent ]
})

export class PacienteModule { }
