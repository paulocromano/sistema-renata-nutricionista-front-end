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

import { ToastyModule } from './../shared/toasty/toasty.module';
import { HorarioAtendimentoComponent } from './horario-atendimento.component';
import { DashboardModule } from './../dashboard/dashboard.module';

@NgModule({
  declarations: [ HorarioAtendimentoComponent ],
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
    ToastyModule,
    DashboardModule
  ]
})

export class HorarioAtendimentoModule { }
