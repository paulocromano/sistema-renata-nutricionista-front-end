import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { TabViewModule } from 'primeng/tabview';

import { CalendarioAtendimentoComponent } from './calendario-atendimento.component';
import { ToastyModule } from './../shared/toasty/toasty.module';
import { DashboardModule } from './../dashboard/dashboard.module';

@NgModule({
  declarations: [ CalendarioAtendimentoComponent ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ProgressSpinnerModule,
    DialogModule,
    TooltipModule,
    InputMaskModule,
    TabViewModule,
    ToastyModule,
    DashboardModule
  ]
})

export class CalendarioAtendimentoModule { }
