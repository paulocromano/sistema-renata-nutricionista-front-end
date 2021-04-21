import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { LoginComponent } from './login/login.component';
import { LogadoGuard } from './shared/guard/logado.guard';
import { AdminGuard } from './shared/guard/admin.guard';
import { CalendarioAtendimentoComponent } from './calendario-atendimento/calendario-atendimento.component';
import { ConsultaRetornoComponent } from './consulta-retorno/consulta-retorno.component';
import { PacienteComponent } from './paciente/paciente.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: PaginaInicialComponent, canActivate: [ LogadoGuard ] },
  { path: 'consultas-retornos', component: ConsultaRetornoComponent, canActivate: [ LogadoGuard ] },
  { path: 'calendario-atendimento', component: CalendarioAtendimentoComponent, canActivate: [ AdminGuard ] },
  { path: 'pacientes', component: PacienteComponent, canActivate: [ LogadoGuard ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
