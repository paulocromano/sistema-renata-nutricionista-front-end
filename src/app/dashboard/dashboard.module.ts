import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DadosPessoaisUsuarioModule } from './../usuario/dados-pessoais-usuario/dados-pessoais-usuario.module';

@NgModule({
  declarations: [ DashboardComponent ],
  imports: [
    CommonModule,
    RouterModule,
    DadosPessoaisUsuarioModule
  ],
  exports: [ DashboardComponent ]
})

export class DashboardModule { }
