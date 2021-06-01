import { CondutaNutricionalFORM } from './../ficha-consulta-retorno/shared/model/conduta-nutricional.form';
import { AvaliacaoMassaMuscularCorporeaFORM } from './../ficha-consulta-retorno/shared/model/avaliacao-massa-muscular-corporea.form';
import { AvaliacaoComposicaoCorporalFORM } from './../ficha-consulta-retorno/shared/model/avaliacao-composicao-corporal.form';
import { AvaliacaoConsumoHabitualFORM } from './../ficha-consulta-retorno/shared/model/avaliacao-consumo-habitual.form';
import { RegistroDietaFORM } from './../ficha-consulta-retorno/shared/model/registro-dieta.form';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { ToastyComponent } from './../../shared/toasty/toasty.component';
import { RetornoConsultaService } from './shared/service/retorno-consulta.service';
import { RetornoConsultaFORM } from './shared/model/retorno-consulta.form';
import { InformacoesCadastroRetornoConsulta } from './shared/model/informacoes-cadastro-retorno.model';

@Component({
  selector: 'app-retorno-consulta',
  templateUrl: './retorno-consulta.component.html',
  styleUrls: ['./retorno-consulta.component.css']
})

export class RetornoConsultaComponent implements OnInit, OnDestroy {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  private subscription: Subscription;
  private idPaciente: number;
  private idRetornoConsulta: number;

  public informacoesCadastroRetornoConsulta: InformacoesCadastroRetornoConsulta = new InformacoesCadastroRetornoConsulta();
  public formularioRetornoConsulta: RetornoConsultaFORM = new RetornoConsultaFORM();

  public carregandoPagina: boolean = true;
  public processandoOperacao: boolean = false;
  public exibirDialogCancelarRetornoConsulta: boolean = false;
  public exibirDialogFinalizarRetornoConsulta: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private retornoConsultaService: RetornoConsultaService
  ) { }

  ngOnInit(): void {
    this.capturarParametrosDaRota();
    this.informacoesParaCadastrarRetornoConsulta();
  }

  private capturarParametrosDaRota(): void {
    this.subscription = this.activatedRoute.params.subscribe((params: any) => {
      this.idPaciente = parseInt(params['idPaciente']);
      this.idRetornoConsulta = parseInt(params['idRetornoConsulta']);
    
      if (!this.idPaciente || !this.idRetornoConsulta) {
        this.router.navigate(['/consultas-retornos']);
      }
    });
  }

  private informacoesParaCadastrarRetornoConsulta(): void {
    this.retornoConsultaService.informacoesParaCadastrarRetornoConsulta(this.idPaciente, this.idRetornoConsulta)
      .subscribe((informacoesCadastroRetornoConsulta: InformacoesCadastroRetornoConsulta) => {
        this.informacoesCadastroRetornoConsulta = informacoesCadastroRetornoConsulta;
        this.carregandoPagina = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.carregandoPagina = false;
        this.toasty.error('Erro ao buscar as informações para cadastro de retorno de consulta!')
      })
  }

  public salvarFormularioRegistroDietaHabitual(formularioRegistroDietaHabitual: RegistroDietaFORM): void {
    this.formularioRetornoConsulta.registroDietaHabitual = formularioRegistroDietaHabitual;
  }

  public salvarFormularioRegistroDieta24h(formularioRegistroDieta24h: RegistroDietaFORM): void {
    this.formularioRetornoConsulta.registroDieta24Horas = formularioRegistroDieta24h;
  }

  public salvarFormularioAvaliacaoConsumoHabitual(formularioAvaliacaoConsumoHabitual: AvaliacaoConsumoHabitualFORM): void {
    this.formularioRetornoConsulta.avaliacaoConsumoHabitual = formularioAvaliacaoConsumoHabitual;
  }

  public salvarFormularioAvaliacaoComposicaoCorporal(formularioAvaliacaoComposicaoCorporal: AvaliacaoComposicaoCorporalFORM): void {
    this.formularioRetornoConsulta.avaliacaoComposicaoCorporal = formularioAvaliacaoComposicaoCorporal;
  }

  public salvarFormularioAvaliacaoMassaMuscularCorporea(formularioAvaliacaoMassaMuscularCorporea: AvaliacaoMassaMuscularCorporeaFORM): void {
    this.formularioRetornoConsulta.avaliacaoMassaMuscularCorporea = formularioAvaliacaoMassaMuscularCorporea;
  }

  public salvarFormularioCondutaNutricional(formularioCondutaNutricional: CondutaNutricionalFORM): void {
    this.formularioRetornoConsulta.condutaNutricional = formularioCondutaNutricional;
  }

  public cancelarRetornoConsulta(): void {
    this.processandoOperacao = true;

    this.retornoConsultaService.cancelarRetornoConsulta(this.idPaciente, this.idRetornoConsulta)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.router.navigate(['/consultas-retornos']);
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao cancelar o retorno da consulta!');
      });
  }

  public finalizarRetornoConsulta(): void {
    this.processandoOperacao = true;

    this.retornoConsultaService.finalizarRetornoConsulta(this.idPaciente, this.idRetornoConsulta, this.formularioRetornoConsulta)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.router.navigate(['/consultas-retornos']);
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao finalizar o retorno da consulta!');
      });
  }

  public botaoFinalizarRetornoConsultaNaoEstaValido(): boolean {
    return this.processandoOperacao || !(this.formularioRetornoConsulta && this.formularioRetornoConsulta.registroDietaHabitual
      && this.formularioRetornoConsulta.registroDieta24Horas && this.formularioRetornoConsulta.avaliacaoConsumoHabitual
      && this.formularioRetornoConsulta.avaliacaoComposicaoCorporal && this.formularioRetornoConsulta.avaliacaoMassaMuscularCorporea 
      && this.formularioRetornoConsulta.condutaNutricional);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.idPaciente = null;
    this.idRetornoConsulta = null;
    this.formularioRetornoConsulta = null;
  }
}
