import { HttpErrorResponse } from '@angular/common/http';
import { CalendarioAtendimentoPacienteFORM } from './shared/model/calendario-atendimento-paciente.form';
import { PeriodoAtendimento } from './shared/model/periodo-atendimento.model';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyComponent } from './../shared/toasty/toasty.component';
import { CalendarioAtendimentoService } from './shared/service/calendario-atendimento.service';

@Component({
  selector: 'app-calendario-atendimento',
  templateUrl: './calendario-atendimento.component.html',
  styleUrls: ['./calendario-atendimento.component.css']
})

export class CalendarioAtendimentoComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  public periodos: PeriodoAtendimento[] = [];
  public formularioCalendario: CalendarioAtendimentoPacienteFORM = new CalendarioAtendimentoPacienteFORM();
  public periodoSelecionado: PeriodoAtendimento = new PeriodoAtendimento();

  public colunasTabela: any[];
  public inputPesquisa: string;
  public processandoOperacao: boolean = false;
  public cadastrandoPeriodosAutomaticamente: boolean = false;
  public cadastrandoPeriodosManualmente: boolean = false;
  public exibirDialogCadastro: boolean = false;
  public exibirDialogExclusao: boolean = false;
  public formatoCalendario: any;
  public indiceAbaTabViewSelecionada: number = 0;

  constructor(private calendarioAtendimentoService: CalendarioAtendimentoService) { }

  ngOnInit(): void {
    this.colunasTabela = [
      { header: 'Data', field: 'data', style: 'col-data' },
      { header: 'Horário', field: 'horario', style: 'col-horario' },
      { header: 'Disponível', field: 'periodoDisponivel', style: 'col-periodo-disponivel' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];

    this.formatoCalendario = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      monthNames: [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro'
      ],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: 'mm/dd/yy'
  };

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

  public armazenarPeriodoParaExclusao(periodo: PeriodoAtendimento): void {
    this.periodoSelecionado = periodo;
    this.exibirDialogExclusao = true;
  }

  public abrirDialogCadastro(): void {
    this.exibirDialogCadastro = true;
  }

  public desabilitarBotaoCadastroPeriodosAutomaticamente(): boolean {
    return new Boolean(this.formularioCalendario.dataInicial || this.formularioCalendario.dataFinal).valueOf();
  }

  public desabilitarBotaoCadastroPeriodosManualmente(): boolean {
    return !(this.formularioCalendario.dataInicial && this.formularioCalendario.dataFinal);
  }

  public abaTabViewSelecionada(event): void {
    this.indiceAbaTabViewSelecionada = event.index;
  }

  public resetarCampos(): void {
    this.exibirDialogCadastro = false;
    this.exibirDialogExclusao = false;
    this.cadastrandoPeriodosAutomaticamente = false;
    this.cadastrandoPeriodosManualmente = false;

    this.periodoSelecionado = new PeriodoAtendimento();
    this.formularioCalendario = new CalendarioAtendimentoPacienteFORM();
  }
}
