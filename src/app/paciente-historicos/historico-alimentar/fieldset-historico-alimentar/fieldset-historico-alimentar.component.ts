import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { HistoricoAlimentarService } from './../shared/service/historico-alimentar.service';
import { Paciente } from './../../../paciente/shared/model/paciente.model';
import { ToastyComponent } from './../../../shared/toasty/toasty.component';
import { HistoricoAlimentar } from './../shared/model/historico-alimentar.model';
import { PreviaHistoricoAlimentar } from './../shared/model/previa-historico-alimentar.model';
import { InformacoesPreviasHistoricosAlimentares } from './../shared/model/informacoes-historicos-alimentares.model';
import { SuplementoPaciente } from './../shared/model/suplemento-paciente.model';
import { InformacoesCadastroHistoricoAlimentar } from './../../../atendimento-paciente/shared/model/informacoes-cadastro-historico-alimentar.model';

@Component({
  selector: 'app-fieldset-historico-alimentar',
  templateUrl: './fieldset-historico-alimentar.component.html',
  styleUrls: ['./fieldset-historico-alimentar.component.css']
})

export class FieldsetHistoricoAlimentarComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  @Input() public paciente: Paciente;
  @Input() public informacoesPreviasHistoricosAlimentares: InformacoesPreviasHistoricosAlimentares;
  @Input() public exibirBotaoCadastrarHistorico: boolean = false;
  @Input() public informacoesParaCadastro: InformacoesCadastroHistoricoAlimentar;

  public previaHistoricoSelecionado: PreviaHistoricoAlimentar = new PreviaHistoricoAlimentar();
  public historicoAlimentar: HistoricoAlimentar = new HistoricoAlimentar();
  public previaHistoricosAlimentares: PreviaHistoricoAlimentar[] = [];
  public dataProximaAtualizacao: string;
  public historicoEstaDesatualizado: boolean = false;
  public possuiHistorico: boolean = false;
  public suplementosPaciente: SuplementoPaciente[] = [];
  public suplementoSelecionado: SuplementoPaciente = new SuplementoPaciente();

  public colunasTabelaPreviaHistoricos: any[];
  public colunasTabelaSuplementosPaciente: any[];
  public inputPesquisaPreviaHistoricos: string;
  public inputPesquisaSuplementosPaciente: string;
  public abrirDialogInformacoes: boolean = false;
  public abrirDialogSuplemento: boolean = false;
  public abrirDialogExclusao: boolean = false;
  public processandoOperacao: boolean = false;
  public processandoExclusao: boolean = false;

  constructor(private historicoAlimentarService: HistoricoAlimentarService) { }

  ngOnInit(): void {
    this.previaHistoricosAlimentares = this.informacoesPreviasHistoricosAlimentares.previaHistoricosAlimentares;
    this.dataProximaAtualizacao = this.informacoesPreviasHistoricosAlimentares.dataProximaAtualizacaoHistoricoAlimentar;
    this.historicoEstaDesatualizado = this.informacoesPreviasHistoricosAlimentares.historicoEstaDesatualizado;
    this.possuiHistorico = this.informacoesPreviasHistoricosAlimentares.possuiHistorico;

    this.colunasTabelaPreviaHistoricos = [
      { header: 'Cadastrado em', field: 'dataHoraCadastroHistoricoAlimentar', style: 'col-data-hora-cadastro' },
      { header: 'A????es', field: 'acoes', style: 'col-acoes' }
    ];

    this.colunasTabelaSuplementosPaciente = [
      { header: 'Nome', field: 'suplemento', style: 'col-suplemento' },
      { header: 'Dose', field: 'dose', style: 'col-dose' },
      { header: 'Forma de Preparo', field: 'formaPreparo', style: 'col-forma-preparo' },
      { header: 'A????es', field: 'acoes', style: 'col-acoes' }
    ];
  }

  public buscarInformacoesPreviasHistoricosAlimentaresDoPaciente(): void {
    this.processandoOperacao = true;

    this.historicoAlimentarService.buscarInformacoesPreviasHistoricosAlimentaresDoPaciente(this.paciente.id)
      .subscribe((informacoesHistoricosPaciente: InformacoesPreviasHistoricosAlimentares) => {
        this.previaHistoricosAlimentares = informacoesHistoricosPaciente.previaHistoricosAlimentares;
        this.dataProximaAtualizacao = informacoesHistoricosPaciente.dataProximaAtualizacaoHistoricoAlimentar;
        this.historicoEstaDesatualizado = informacoesHistoricosPaciente.historicoEstaDesatualizado;
        this.possuiHistorico = informacoesHistoricosPaciente.possuiHistorico;
        this.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao buscar pr??via dos hist??ricos alimentares!');
      });
  }

  public buscarHistoricoAlimentarDoPaciente(previaHistoricoAlimentar: PreviaHistoricoAlimentar): void {
    this.processandoOperacao = true;
    previaHistoricoAlimentar.processandoOperacao = true;

    this.historicoAlimentarService.buscarHistoricoAlimentarDoPaciente(this.previaHistoricoSelecionado.id) 
      .subscribe((historicoAlimentar: HistoricoAlimentar) => {
        this.historicoAlimentar = historicoAlimentar;
        this.suplementosPaciente = historicoAlimentar.suplementosPaciente;
        this.processandoOperacao = false;
        this.abrirDialogInformacoes = true;
        previaHistoricoAlimentar.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        previaHistoricoAlimentar.processandoOperacao = false;
        this.toasty.error('Erro ao buscar hist??rico alimentar!');
      });
  }

  public excluirHistoricoAlimentar(): void {
    this.processandoExclusao = true;

    this.historicoAlimentarService.excluirHistoricoAlimentar(this.previaHistoricoSelecionado.id)
      .subscribe(() => {
        this.processandoExclusao = false;
        this.resetarCampos();
        this.buscarInformacoesPreviasHistoricosAlimentaresDoPaciente();
        this.toasty.success('Hist??rico alimentar exclu??do com sucesso!');
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoExclusao = false;
        this.toasty.error('Erro ao excluir hist??rico alimentar!');
      });
  }

  public cadastroHistoricoAlimentar(historicoCadastrado: boolean): void {
    if (historicoCadastrado) {
      this.buscarInformacoesPreviasHistoricosAlimentaresDoPaciente();
    }
  }

  public armazenarPreviaHistoricoSelecionadoParaDialogInformacoes(previaHistoricoAlimentar: PreviaHistoricoAlimentar): void {
    this.previaHistoricoSelecionado = previaHistoricoAlimentar;
    this.buscarHistoricoAlimentarDoPaciente(previaHistoricoAlimentar);
  }

  public armazenarPreviaHistoricoSelecionadoParaDialogExclusao(previaHistoricoAlimentar: PreviaHistoricoAlimentar): void {
    this.previaHistoricoSelecionado = previaHistoricoAlimentar;
    this.abrirDialogExclusao = true;
  }

  public armazenarSuplementoSelecionado(suplementoPaciente: SuplementoPaciente): void {
    this.suplementoSelecionado = suplementoPaciente;
    this.abrirDialogSuplemento = true;
  }

  public resetarCampos(): void {
    this.abrirDialogInformacoes = false;
    this.abrirDialogExclusao = false;

    this.previaHistoricoSelecionado = new PreviaHistoricoAlimentar();
    this.historicoAlimentar = new HistoricoAlimentar();
    this.suplementosPaciente = [];
    this.suplementoSelecionado = new SuplementoPaciente();
  }
}
