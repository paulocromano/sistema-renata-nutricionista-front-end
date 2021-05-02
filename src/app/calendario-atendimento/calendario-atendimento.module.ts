import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';

import { CalendarioAtendimentoComponent } from './calendario-atendimento.component';
import { ToastyModule } from './../shared/toasty/toasty.module';



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
    CalendarModule,
    ToastyModule
  ]
})

export class CalendarioAtendimentoModule { }
