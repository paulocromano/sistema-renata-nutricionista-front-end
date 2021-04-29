import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { LoginModule } from './login/login.module';
import { PaginaInicialModule } from './pagina-inicial/pagina-inicial.module';
import { ConsultaRetornoModule } from './consulta-retorno/consulta-retorno.module';
import { CalendarioAtendimentoModule } from './calendario-atendimento/calendario-atendimento.module';
import { PacienteModule } from './paciente/paciente.module';
import { PacienteHistoricosModule } from './paciente-historicos/paciente-historicos.module';
import { PatologiaModule } from './patologia/patologia.module';
import { SuplementoModule } from './suplemento/suplemento.module';
import { ToastyModule } from './shared/toasty/toasty.module';
import { InterceptorModule } from './interceptor/interceptor.module';
import { LogadoGuard } from './shared/guard/logado.guard';
import { AdminGuard } from './shared/guard/admin.guard';
import { MedicamentoModule } from './medicamento/medicamento.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    PaginaInicialModule,
    ConsultaRetornoModule,
    CalendarioAtendimentoModule,
    PacienteModule,
    PacienteHistoricosModule,
    PatologiaModule,
    SuplementoModule,
    MedicamentoModule,
    ToastyModule,
    InterceptorModule,
    JwtModule.forRoot({})
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    LogadoGuard,
    AdminGuard
   ],
  bootstrap: [AppComponent]
})

export class AppModule { }
