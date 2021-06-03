import { NgxMaskModule } from 'ngx-mask';
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
import { FieldsetModule } from 'primeng/fieldset';

import { ToastyModule } from '../shared/toasty/toasty.module';
import { TabelaConsultasRetornosComponent } from './tabela-consultas-retornos/tabela-consultas-retornos.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { RetornoConsultaComponent } from './retorno-consulta/retorno-consulta.component';
import { RegistroDietaComponent } from './ficha-consulta-retorno/registro-dieta/registro-dieta.component';
import { AvaliacaoConsumoHabitualComponent } from './ficha-consulta-retorno/avaliacao-consumo-habitual/avaliacao-consumo-habitual.component';
import { AvaliacaoComposicaoCorporalComponent } from './ficha-consulta-retorno/avaliacao-composicao-corporal/avaliacao-composicao-corporal.component';
import { AvaliacaoMassaMuscularCorporeaComponent } from './ficha-consulta-retorno/avaliacao-massa-muscular-corporea/avaliacao-massa-muscular-corporea.component';
import { CondutaNutricionalComponent } from './ficha-consulta-retorno/conduta-nutricional/conduta-nutricional.component';
import { PacienteHistoricosModule } from './../paciente-historicos/paciente-historicos.module';

@NgModule({
  declarations: [ 
    TabelaConsultasRetornosComponent, 
    ConsultaComponent, 
    RetornoConsultaComponent, 
    RegistroDietaComponent, 
    AvaliacaoConsumoHabitualComponent, 
    AvaliacaoComposicaoCorporalComponent, 
    AvaliacaoMassaMuscularCorporeaComponent, 
    CondutaNutricionalComponent
  ],
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
    FieldsetModule,
    PacienteHistoricosModule,
    NgxMaskModule.forChild(),
    ToastyModule
  ]
})
export class AtendimentoPacienteModule { }
