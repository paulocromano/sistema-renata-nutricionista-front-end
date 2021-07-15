import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { LoginComponent } from './login/login.component';
import { LogadoGuard } from './shared/guard/logado.guard';
import { AdminGuard } from './shared/guard/admin.guard';
import { CalendarioAtendimentoComponent } from './calendario-atendimento/calendario-atendimento.component';
import { TabelaPacientesComponent } from './paciente/tabela-pacientes/tabela-pacientes.component';
import { TabelaConsultasRetornosComponent } from './atendimento-paciente/tabela-consultas-retornos/tabela-consultas-retornos.component';
import { InformacoesHistoricosComponent } from './paciente-historicos/informacoes-historicos/informacoes-historicos.component';
import { MedicamentoComponent } from './medicamento/medicamento.component';
import { SuplementoComponent } from './suplemento/suplemento.component';
import { PatologiaComponent } from './patologia/patologia.component';
import { RetornoConsultaComponent } from './atendimento-paciente/retorno-consulta/retorno-consulta.component';
import { ConsultaComponent } from './atendimento-paciente/consulta/consulta.component';
import { ParametrosAtendimentoPacienteComponent } from './parametros-atendimento-paciente/parametros-atendimento-paciente.component';
import { HorarioAtendimentoComponent } from './horario-atendimento/horario-atendimento.component';
import { PaginaRelatoriosGraficosComponent } from './relatorios-graficos/pagina-relatorios-graficos/pagina-relatorios-graficos.component';
import { TabelaColaboradoresComponent } from './usuario/tabela-colaboradores/tabela-colaboradores.component';

const routes: Routes = [
  { path: 'inicio', component: PaginaInicialComponent, canActivate: [ LogadoGuard ] },
  { path: 'consultas-retornos', component: TabelaConsultasRetornosComponent, canActivate: [ LogadoGuard ] },
  { path: 'consulta/:idPaciente/:idConsulta', component: ConsultaComponent, canActivate: [ AdminGuard ] },
  { path: 'retorno-consulta/:idPaciente/:idRetornoConsulta', component: RetornoConsultaComponent, canActivate: [ AdminGuard ] },
  { path: 'calendario-agendamento', component: CalendarioAtendimentoComponent, canActivate: [ LogadoGuard ] },
  { path: 'pacientes', component: TabelaPacientesComponent, canActivate: [ LogadoGuard ] },
  { path: 'paciente/historicos/:id', component: InformacoesHistoricosComponent, canActivate: [ AdminGuard ] },
  { path: 'medicamentos', component: MedicamentoComponent, canActivate: [ AdminGuard ] },
  { path: 'suplementos', component: SuplementoComponent, canActivate: [ AdminGuard ] },
  { path: 'patologias', component: PatologiaComponent, canActivate: [ AdminGuard ] },
  { path: 'parametros-atendimento', component: ParametrosAtendimentoPacienteComponent, canActivate: [ AdminGuard ] },
  { path: 'horario-atendimento', component: HorarioAtendimentoComponent, canActivate: [ LogadoGuard ] },
  { path: 'relatorios-graficos', component: PaginaRelatoriosGraficosComponent, canActivate: [ LogadoGuard ] },
  { path: 'colaboradores', component: TabelaColaboradoresComponent, canActivate: [ AdminGuard ] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
