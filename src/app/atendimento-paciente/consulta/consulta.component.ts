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
  private formularioRegistroDietaHabitual: RegistroDietaFORM = null;
  private formularioAvaliacaoConsumoHabitual: AvaliacaoConsumoHabitualFORM = null;
  private formularioAvaliacaoComposicaoCorporal: AvaliacaoComposicaoCorporalFORM = null;
  private formularioAvaliacaoMassaMuscularCorporea: AvaliacaoMassaMuscularCorporeaFORM = null;
  private formularioCondutaNutricional: CondutaNutricionalFORM = null;

  public carregandoPagina: boolean = true;
  public processandoOperacao: boolean = true;

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
        console.log(this.informacoesCadastroConsulta);
        this.carregandoPagina = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.carregandoPagina = false;
        this.toasty.error('Erro ao buscar as informações para cadastro de consulta!')
      })
  }

  public salvarFormularioRegistroDietaHabitual(formularioRegistroDietaHabitual: RegistroDietaFORM): void {
    this.formularioRegistroDietaHabitual = formularioRegistroDietaHabitual;
  }

  public salvarFormularioAvaliacaoConsumoHabitual(formularioAvaliacaoConsumoHabitual: AvaliacaoConsumoHabitualFORM): void {
    this.formularioAvaliacaoConsumoHabitual = formularioAvaliacaoConsumoHabitual;
  }

  public salvarFormularioAvaliacaoComposicaoCorporal(formularioAvaliacaoComposicaoCorporal: AvaliacaoComposicaoCorporalFORM): void {
    this.formularioAvaliacaoComposicaoCorporal = formularioAvaliacaoComposicaoCorporal;
  }

  public salvarFormularioAvaliacaoMassaMuscularCorporea(formularioAvaliacaoMassaMuscularCorporea: AvaliacaoMassaMuscularCorporeaFORM): void {
    this.formularioAvaliacaoMassaMuscularCorporea = formularioAvaliacaoMassaMuscularCorporea;
  }

  public salvarFormularioCondutaNutricional(formularioCondutaNutricional: CondutaNutricionalFORM): void {
    this.formularioCondutaNutricional = formularioCondutaNutricional;
  }

  public ngOnDestroy(): void {
    this.formularioRegistroDietaHabitual = null;
    this.formularioAvaliacaoConsumoHabitual = null;
    this.formularioAvaliacaoComposicaoCorporal = null;
    this.formularioAvaliacaoMassaMuscularCorporea = null;
    this.formularioCondutaNutricional = null;
  }
}
