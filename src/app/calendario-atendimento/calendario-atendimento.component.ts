import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyComponent } from './../shared/toasty/toasty.component';
import { CalendarioAtendimentoService } from './shared/service/calendario-atendimento.service';
import { PeriodoAtendimentoFORM } from './shared/model/periodo-atendimento.form';
import { CalendarioAtendimentoPacienteFORM } from './shared/model/calendario-atendimento-paciente.form';
import { PeriodoAtendimento } from './shared/model/periodo-atendimento.model';
import { TokenService } from './../shared/service/token.service';

@Component({
  selector: 'app-calendario-atendimento',
  templateUrl: './calendario-atendimento.component.html',
  styleUrls: ['./calendario-atendimento.component.css']
})

export class CalendarioAtendimentoComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  public usuarioAdmin: boolean = false;

  public periodos: PeriodoAtendimento[] = [];
  public formularioCalendario: CalendarioAtendimentoPacienteFORM = new CalendarioAtendimentoPacienteFORM();
  public formularioPeriodo: PeriodoAtendimentoFORM = new PeriodoAtendimentoFORM();
  public periodoSelecionado: PeriodoAtendimento = new PeriodoAtendimento();
  public dataInicialExclusaoPeriodos: string = '';
  public dataFinalExclusaoPeriodos: string = '';

  public colunasTabela: any[];
  public inputPesquisa: string;
  public processandoOperacao: boolean = false;
  public cadastrandoPeriodosAutomaticamente: boolean = false;
  public cadastrandoPeriodosManualmente: boolean = false;
  public exibirDialogCadastro: boolean = false;
  public exibirDialogExclusaoDeUmPeriodo: boolean = false;
  public exibirDialogExclusaoDePeriodos: boolean = false;
  public indiceAbaTabViewSelecionada: number = 0;
  public quantidadePeriodosDisponiveisIntervaloParaExclusao: number = 0;

  constructor(
    private calendarioAtendimentoService: CalendarioAtendimentoService,
    private tokenService: TokenService
    ) { }

  ngOnInit(): void {
    this.usuarioAdmin = this.tokenService.contemPermissaoAdmin();
    
    this.colunasTabela = [
      { header: 'Data', field: 'data', style: 'col-data' },
      { header: 'Horário', field: 'horario', style: 'col-horario' },
      { header: 'Disponível', field: 'periodoDisponivel', style: 'col-periodo-disponivel' }
    ];

    if (this.usuarioAdmin) {
      this.colunasTabela.push({ header: 'Ações', field: 'acoes', style: 'col-acoes' });
    }

    this.listarPeriodosAPartirDoDiaAtual();
  }

  public listarPeriodosAPartirDoDiaAtual(): void {
    this.processandoOperacao = true;

    this.calendarioAtendimentoService.listarPeriodosAPartirDoDiaAtual()
      .subscribe((periodosAtendimento: PeriodoAtendimento[]) => {
        this.periodos = periodosAtendimento;
        this.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao listar períodos de atendimento!');
      });
  }

  public cadastrarPeriodo(): void {
    this.processandoOperacao = true;

    this.calendarioAtendimentoService.cadastrarUmPeriodoNoCalendario(this.formularioPeriodo)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.resetarCampos();
        this.listarPeriodosAPartirDoDiaAtual();
        this.toasty.success('Período cadastrado com sucesso!');
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;

        if (errorResponse.status === 400) {
          this.toasty.error(errorResponse.error.message);
        }
        else {
          this.toasty.error('Erro ao cadastrar período!');
        }
      });
  }

  public cadastrarPeriodosAutomaticamente(): void {
    this.processandoOperacao = true;
    this.cadastrandoPeriodosAutomaticamente = true;

    this.calendarioAtendimentoService.cadastrarPeriodosAutomaticamenteNoCalendarioParaAtendimentoPaciente()
      .subscribe(() => {
        this.processandoOperacao = false;
        this.resetarCampos();
        this.listarPeriodosAPartirDoDiaAtual();
        this.toasty.success('Períodos cadastrados com sucesso!');
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.cadastrandoPeriodosAutomaticamente = false;

        if (errorResponse.status === 400) {
          this.toasty.error(errorResponse.error.message);
        }
        else {
          this.toasty.error('Erro ao cadastrar períodos automaticamente!');
        }
      });
  }

  public cadastrarPeriodosManualmente(): void {
    this.processandoOperacao = true;
    this.cadastrandoPeriodosManualmente = true;

    this.calendarioAtendimentoService.cadastrarPeriodosManualmenteNoCalendarioParaAtendimentoPaciente(this.formularioCalendario)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.resetarCampos();
        this.listarPeriodosAPartirDoDiaAtual();
        this.toasty.success('Períodos cadastrados com sucesso!');
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.cadastrandoPeriodosManualmente = false;

        if (errorResponse.status === 400) {
          this.toasty.error(errorResponse.error.message);
        }
        else {
          this.toasty.error('Erro ao cadastrar períodos manualmente!');
        }
      });
  }

  public excluirPeriodo(): void {
    this.processandoOperacao = true;

    this.calendarioAtendimentoService.excluirPeriodo(this.periodoSelecionado.id)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.resetarCampos();
        this.listarPeriodosAPartirDoDiaAtual();
        this.toasty.success('Período excluído com sucesso!');
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;

        if (errorResponse.status === 400) {
          this.toasty.error(errorResponse.error.message);
        }
        else {
          this.toasty.error('Erro ao excluir período!');
        }
      });
  }

  public excluirPeriodos(): void {
    this.processandoOperacao = true;

    this.calendarioAtendimentoService.excluirPeriodosConformeDataInicialFinal(this.dataInicialExclusaoPeriodos, this.dataFinalExclusaoPeriodos)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.resetarCampos();
        this.listarPeriodosAPartirDoDiaAtual();
        this.toasty.success('Períodos excluídos com sucesso!');
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;

        if (errorResponse.status === 400) {
          this.toasty.error(errorResponse.error.message);
        }
        else {
          this.toasty.error('Erro ao excluir períodos!');
        }
      });
  }

  public armazenarPeriodoParaExclusao(periodo: PeriodoAtendimento): void {
    this.periodoSelecionado = periodo;
    this.exibirDialogExclusaoDeUmPeriodo = true;
  }

  public abrirDialogCadastro(): void {
    this.exibirDialogCadastro = true;
  }

  public desabilitarBotaoConfirmarCadastroDePeriodo(): boolean {
    return !((this.formularioPeriodo.data && !this.formularioPeriodo.data.includes('_')) 
      && (this.formularioPeriodo.horario && !this.formularioPeriodo.horario.includes('_')));
  }

  public desabilitarBotaoCadastroPeriodosAutomaticamente(): boolean {
    return new Boolean(this.formularioCalendario.dataInicial || this.formularioCalendario.dataFinal).valueOf();
  }

  public desabilitarBotaoCadastroPeriodosManualmente(): boolean {
    return !(this.formularioCalendario.dataInicial && !this.formularioCalendario.dataInicial.includes('_') 
      && (this.formularioCalendario.dataFinal && !this.formularioCalendario.dataFinal.includes('_')));
  }

  public abaTabViewSelecionada(event): void {
    this.indiceAbaTabViewSelecionada = event.index;
  }

  public abrirDialogExclusaoPeriodos(): void {
    this.exibirDialogExclusaoDePeriodos = true;
  }

  public converterStringDataParaDate(data: string): Date {
    let dataSeparadaPorBarra = data.split('/');
    let dataFormatada = dataSeparadaPorBarra[2] + '-' + dataSeparadaPorBarra[1] + '-' + dataSeparadaPorBarra[0];

    return new Date(dataFormatada);
  }

  public camposParaExclusaoDePeriodosEstaoValidos(): boolean {
    let camposEstaoValidos: boolean = (this.dataInicialExclusaoPeriodos && !this.dataInicialExclusaoPeriodos.includes('_'))
      && (this.dataFinalExclusaoPeriodos && !this.dataFinalExclusaoPeriodos.includes('_'));
    
    if (camposEstaoValidos) {
      this.totalPeriodosDisponiveisParaExclusao();
    }

    return camposEstaoValidos;
  }

  public totalPeriodosDisponiveisParaExclusao(): void {
    let dataInicialParaExclusao: Date = this.converterStringDataParaDate(this.dataInicialExclusaoPeriodos);
    let dataFinalParaExclusao: Date = this.converterStringDataParaDate(this.dataFinalExclusaoPeriodos);

    this.quantidadePeriodosDisponiveisIntervaloParaExclusao = this.periodos
      .filter(periodo => {
        let dataPeriodo: Date = this.converterStringDataParaDate(periodo.data);
        return periodo.periodoDisponivel === 'Sim' && dataPeriodo >= dataInicialParaExclusao && dataPeriodo <= dataFinalParaExclusao
      }).length;
  }

  public resetarCampos(): void {
    this.exibirDialogCadastro = false;
    this.exibirDialogExclusaoDeUmPeriodo = false;
    this.exibirDialogExclusaoDePeriodos = false;
    this.cadastrandoPeriodosAutomaticamente = false;
    this.cadastrandoPeriodosManualmente = false;

    this.periodoSelecionado = new PeriodoAtendimento();
    this.formularioCalendario = new CalendarioAtendimentoPacienteFORM();
    this.formularioPeriodo = new PeriodoAtendimentoFORM();
    this.dataInicialExclusaoPeriodos = '';
    this.dataFinalExclusaoPeriodos = '';
  }
}
