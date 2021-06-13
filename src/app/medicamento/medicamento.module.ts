import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';

import { MedicamentoComponent } from './medicamento.component';
import { ToastyModule } from './../shared/toasty/toasty.module';
import { DashboardModule } from './../dashboard/dashboard.module';

@NgModule({
  declarations: [ MedicamentoComponent ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ProgressSpinnerModule,
    DialogModule,
    TooltipModule,
    ToastyModule,
    DashboardModule
  ]
})

export class MedicamentoModule { }
