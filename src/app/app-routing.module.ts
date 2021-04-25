import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { LoginComponent } from './login/login.component';
import { LogadoGuard } from './shared/guard/logado.guard';
import { AdminGuard } from './shared/guard/admin.guard';
import { CalendarioAtendimentoComponent } from './calendario-atendimento/calendario-atendimento.component';
import { ConsultaRetornoComponent } from './consulta-retorno/consulta-retorno.component';
import { TabelaPacientesComponent } from './paciente/tabela-pacientes/tabela-pacientes.component';
import { InformacoesHistoricosComponent } from './paciente-historicos/informacoes-historicos/informacoes-historicos.component';

const routes: Routes = [
  { path: 'inicio', component: PaginaInicialComponent, canActivate: [ LogadoGuard ] },
  { path: 'consultas-retornos', component: ConsultaRetornoComponent, canActivate: [ LogadoGuard ] },
  { path: 'calendario-atendimento', component: CalendarioAtendimentoComponent, canActivate: [ AdminGuard ] },
  { path: 'pacientes', component: TabelaPacientesComponent, canActivate: [ LogadoGuard ] },
  { path: 'paciente/historicos/:id', component: InformacoesHistoricosComponent, canActivate: [ AdminGuard ] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
