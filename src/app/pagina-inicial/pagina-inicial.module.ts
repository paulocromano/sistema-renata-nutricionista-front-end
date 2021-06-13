import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PaginaInicialComponent } from './pagina-inicial.component';
import { DashboardModule } from './../dashboard/dashboard.module';

@NgModule({
  declarations: [ PaginaInicialComponent ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardModule
  ]
})
export class PaginaInicialModule { }
