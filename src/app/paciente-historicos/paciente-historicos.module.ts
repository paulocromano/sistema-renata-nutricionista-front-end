import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';

import { ToastyModule } from './../shared/toasty/toasty.module';
import { InformacoesHistoricosComponent } from './informacoes-historicos/informacoes-historicos.component';
import { FieldsetHistoricoSocialComponent } from './historico-social/fieldset-historico-social/fieldset-historico-social.component';
import { FieldsetHistoricoAlimentarComponent } from './historico-alimentar/fieldset-historico-alimentar/fieldset-historico-alimentar.component';
import { FieldsetHistoricoAtividadeFisicaComponent } from './historico-atividade-fisica/fieldset-historico-atividade-fisica/fieldset-historico-atividade-fisica.component';
import { HistoricoQuestionarioFrequenciaAlimentarComponent } from './historico-questionario-frequencia-alimentar/historico-questionario-frequencia-alimentar/historico-questionario-frequencia-alimentar.component';
import { FieldsetHistoricoPatologiaFamiliaresComponent } from './historico-patologia-familiares-por-data/fieldset-historico-patologia-familiares/fieldset-historico-patologia-familiares.component';

@NgModule({
  declarations: [ 
    InformacoesHistoricosComponent, 
    FieldsetHistoricoSocialComponent, 
    FieldsetHistoricoAlimentarComponent, 
    FieldsetHistoricoAtividadeFisicaComponent,
    FieldsetHistoricoPatologiaFamiliaresComponent,
    HistoricoQuestionarioFrequenciaAlimentarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FieldsetModule,
    TableModule,
    InputTextModule,
    ProgressSpinnerModule,
    DialogModule,
    TooltipModule,
    DropdownModule,
    InputTextareaModule,
    InputNumberModule,
    MultiSelectModule,
    ToastyModule
  ],
  exports: [
    FieldsetHistoricoSocialComponent, 
    FieldsetHistoricoAlimentarComponent, 
    FieldsetHistoricoAtividadeFisicaComponent,
    FieldsetHistoricoPatologiaFamiliaresComponent,
    HistoricoQuestionarioFrequenciaAlimentarComponent
  ]
})

export class PacienteHistoricosModule { }
