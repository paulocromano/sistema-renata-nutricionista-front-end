import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginaRelatoriosGraficosComponent } from './pagina-relatorios-graficos/pagina-relatorios-graficos.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { GraficoComponent } from './grafico/grafico.component';



@NgModule({
  declarations: [ 
    PaginaRelatoriosGraficosComponent, 
    RelatorioComponent, 
    GraficoComponent 
  ],
  imports: [
    CommonModule
  ]
})

export class RelatoriosGraficosModule { }
