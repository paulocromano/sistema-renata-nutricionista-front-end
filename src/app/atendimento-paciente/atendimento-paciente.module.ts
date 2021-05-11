import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';

import { ToastyModule } from '../shared/toasty/toasty.module';
import { TabelaConsultasRetornosComponent } from './tabela-consultas-retornos/tabela-consultas-retornos.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { RetornoConsultaComponent } from './retorno-consulta/retorno-consulta.component';

@NgModule({
  declarations: [ TabelaConsultasRetornosComponent, ConsultaComponent, RetornoConsultaComponent ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ProgressSpinnerModule,
    DialogModule,
    TooltipModule,
    ToastyModule
  ]
})
export class AtendimentoPacienteModule { }
