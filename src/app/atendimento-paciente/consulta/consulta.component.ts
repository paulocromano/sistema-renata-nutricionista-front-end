import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { ToastyComponent } from './../../shared/toasty/toasty.component';
import { InformacoesCadastroConsulta } from './shared/model/informacoes-cadastro-consulta.model';
import { ConsultaService } from './shared/service/consulta.service';
import { RegistroDietaFORM } from './../ficha-consulta-retorno/shared/model/registro-dieta.form';
import { AvaliacaoComposicaoCorporalFORM } from './../ficha-consulta-retorno/shared/model/avaliacao-composicao-corporal.form';
import { AvaliacaoConsumoHabitualFORM } from './../ficha-consulta-retorno/shared/model/avaliacao-consumo-habitual.form';
import { AvaliacaoMassaMuscularCorporeaFORM } from '../ficha-consulta-retorno/shared/model/avaliacao-massa-muscular-corporea.form';
import { CondutaNutricionalFORM } from '../ficha-consulta-retorno/shared/model/conduta-nutricional.form';
import { ConsultaFORM } from './shared/model/consulta.form';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})

export class ConsultaComponent implements OnInit, OnDestroy {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  private subscription: Subscription;
  private idPaciente: number;
  private idConsulta: number;

  public informacoesCadastroConsulta: InformacoesCadastroConsulta = new InformacoesCadastroConsulta();
  public formularioConsulta: ConsultaFORM = new ConsultaFORM();

  public carregandoPagina: boolean = true;
  public processandoOperacao: boolean = false;
  public exibirDialogCancelarConsulta: boolean = false;
  public exibirDialogFinalizarConsulta: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private consultaService: ConsultaService
  ) { }

  ngOnInit(): void {
    this.capturarParametrosDaRota();
    this.informacoesParaCadastrarConsulta();
  }

  private capturarParametrosDaRota(): void {
    this.subscription = this.activatedRoute.params.subscribe((params: any) => {
      this.idPaciente = parseInt(params['idPaciente']);
      this.idConsulta = parseInt(params['idConsulta']);
    
      if (!this.idPaciente || !this.idConsulta) {
        this.router.navigate(['/consultas-retornos']);
      }
    });
  }

  private informacoesParaCadastrarConsulta(): void {
    this.consultaService.informacoesParaCadastrarConsulta(this.idPaciente, this.idConsulta)
      .subscribe((informacoesCadastroConsulta: InformacoesCadastroConsulta) => {
        this.informacoesCadastroConsulta = informacoesCadastroConsulta;
        this.carregandoPagina = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.carregandoPagina = false;
        this.toasty.error('Erro ao buscar as informações para cadastro de consulta!')
      })
  }

  public salvarFormularioRegistroDietaHabitual(formularioRegistroDietaHabitual: RegistroDietaFORM): void {
    this.formularioConsulta.registroDietaHabitual = formularioRegistroDietaHabitual;
  }

  public salvarFormularioAvaliacaoConsumoHabitual(formularioAvaliacaoConsumoHabitual: AvaliacaoConsumoHabitualFORM): void {
    this.formularioConsulta.avaliacaoConsumoHabitual = formularioAvaliacaoConsumoHabitual;
  }

  public salvarFormularioAvaliacaoComposicaoCorporal(formularioAvaliacaoComposicaoCorporal: AvaliacaoComposicaoCorporalFORM): void {
    this.formularioConsulta.avaliacaoComposicaoCorporal = formularioAvaliacaoComposicaoCorporal;
  }

  public salvarFormularioAvaliacaoMassaMuscularCorporea(formularioAvaliacaoMassaMuscularCorporea: AvaliacaoMassaMuscularCorporeaFORM): void {
    this.formularioConsulta.avaliacaoMassaMuscularCorporea = formularioAvaliacaoMassaMuscularCorporea;
  }

  public salvarFormularioCondutaNutricional(formularioCondutaNutricional: CondutaNutricionalFORM): void {
    this.formularioConsulta.condutaNutricional = formularioCondutaNutricional;
  }

  public cancelarConsulta(): void {
    this.processandoOperacao = true;

    this.consultaService.cancelarConsulta(this.idPaciente, this.idConsulta)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.router.navigate(['/consultas-retornos']);
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao cancelar a consulta!');
      });
  }

  public finalizarConsulta(): void {
    this.processandoOperacao = true;

    this.consultaService.finalizarConsulta(this.idPaciente, this.idConsulta, this.formularioConsulta)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.router.navigate(['/consultas-retornos']);
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao finalizar a consulta!');
      });
  }

  public botaoFinalizarConsultaNaoEstaValido(): boolean {
    return this.processandoOperacao || !(this.formularioConsulta && this.formularioConsulta.registroDietaHabitual
      && this.formularioConsulta.avaliacaoConsumoHabitual && this.formularioConsulta.avaliacaoComposicaoCorporal
      && this.formularioConsulta.avaliacaoMassaMuscularCorporea && this.formularioConsulta.condutaNutricional);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.idPaciente = null;
    this.idConsulta = null;
    this.formularioConsulta = null;
  }
}
