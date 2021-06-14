import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { PasswordModule } from 'primeng/password';

import { TabelaColaboradoresComponent } from './tabela-colaboradores/tabela-colaboradores.component';
import { ToastyModule } from '../shared/toasty/toasty.module';
import { DashboardModule } from './../dashboard/dashboard.module';
import { DadosPessoaisUsuarioComponent } from './dados-pessoais-usuario/dados-pessoais-usuario.component';

@NgModule({
  declarations: [
    TabelaColaboradoresComponent,
    DadosPessoaisUsuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ProgressSpinnerModule,
    DialogModule,
    TooltipModule,
    PasswordModule,
    ToastyModule,
    DashboardModule
  ]
})
export class UsuarioModule { }
