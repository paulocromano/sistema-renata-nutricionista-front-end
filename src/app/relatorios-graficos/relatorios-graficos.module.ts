import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatorioComponent } from './relatorio/relatorio.component';
import { GraficoComponent } from './grafico/grafico.component';
import { ToastModule } from 'primeng/toast';
import { DashboardModule } from './../dashboard/dashboard.module';
import { PaginaRelatoriosGraficosComponent } from './pagina-relatorios-graficos/pagina-relatorios-graficos.component';

@NgModule({
  declarations: [ 
    PaginaRelatoriosGraficosComponent,
    RelatorioComponent, 
    GraficoComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    DashboardModule
  ]
})

export class RelatoriosGraficosModule { }
