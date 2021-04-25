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

import { ToastyModule } from './../shared/toasty/toasty.module';
import { InformacoesHistoricosComponent } from './informacoes-historicos/informacoes-historicos.component';
import { FieldsetHistoricoSocialComponent } from './historico-social/fieldset-historico-social/fieldset-historico-social.component';
import { CadastroHistoricoSocialComponent } from './historico-social/cadastro-historico-social/cadastro-historico-social.component';
import { FieldsetHistoricoAlimentarComponent } from './historico-alimentar/fieldset-historico-alimentar/fieldset-historico-alimentar.component';
import { CadastroHistoricoAlimentarComponent } from './historico-alimentar/cadastro-historico-alimentar/cadastro-historico-alimentar.component';
import { FieldsetHistoricoAtividadeFisicaComponent } from './historico-atividade-fisica/fieldset-historico-atividade-fisica/fieldset-historico-atividade-fisica.component';
import { CadastroHistoricoAtividadeFisicaComponent } from './historico-atividade-fisica/cadastro-historico-atividade-fisica/cadastro-historico-atividade-fisica.component';
import { CadastroHistoricoPatologiaFamiliaresComponent } from './historico-patologia-familiares-por-data/cadastro-historico-patologia-familiares/cadastro-historico-patologia-familiares.component';
import { HistoricoQuestionarioFrequenciaAlimentarComponent } from './historico-questionario-frequencia-alimentar/historico-questionario-frequencia-alimentar/historico-questionario-frequencia-alimentar.component';
import { CadastroQuestionarioFrequenciaAlimentarComponent } from './historico-questionario-frequencia-alimentar/cadastro-questionario-frequencia-alimentar/cadastro-questionario-frequencia-alimentar.component';
import { FieldsetHistoricoPatologiaFamiliaresComponent } from './historico-patologia-familiares-por-data/fieldset-historico-patologia-familiares/fieldset-historico-patologia-familiares.component';

@NgModule({
  declarations: [ 
    InformacoesHistoricosComponent, 
    FieldsetHistoricoSocialComponent, 
    CadastroHistoricoSocialComponent, 
    FieldsetHistoricoAlimentarComponent, 
    CadastroHistoricoAlimentarComponent,
    FieldsetHistoricoAtividadeFisicaComponent,
    CadastroHistoricoAtividadeFisicaComponent,
    FieldsetHistoricoPatologiaFamiliaresComponent,
    CadastroHistoricoPatologiaFamiliaresComponent,
    HistoricoQuestionarioFrequenciaAlimentarComponent,
    CadastroQuestionarioFrequenciaAlimentarComponent,
    
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
    ToastyModule
  ],
  exports: []
})

export class PacienteHistoricosModule { }
