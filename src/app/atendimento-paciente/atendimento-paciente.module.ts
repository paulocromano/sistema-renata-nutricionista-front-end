import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';

import { ToastyModule } from '../shared/toasty/toasty.module';
import { TabelaConsultasRetornosComponent } from './tabela-consultas-retornos/tabela-consultas-retornos.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { RetornoConsultaComponent } from './retorno-consulta/retorno-consulta.component';

@NgModule({
  declarations: [ TabelaConsultasRetornosComponent, ConsultaComponent, RetornoConsultaComponent ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TableModule,
    InputTextModule,
    ProgressSpinnerModule,
    DialogModule,
    TooltipModule,
    InputMaskModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule,
    InputNumberModule,
    ToastyModule
  ]
})
export class AtendimentoPacienteModule { }
