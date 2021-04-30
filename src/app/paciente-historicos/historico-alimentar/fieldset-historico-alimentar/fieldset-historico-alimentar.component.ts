import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { HistoricoAlimentarService } from './../shared/service/historico-alimentar.service';
import { Paciente } from './../../../paciente/shared/model/paciente.model';
import { ToastyComponent } from './../../../shared/toasty/toasty.component';
import { HistoricoAlimentar } from './../shared/model/historico-alimentar.model';
import { PreviaHistoricoAlimentar } from './../shared/model/previa-historico-alimentar.model';
import { InformacoesPreviasHistoricosAlimentares } from './../shared/model/informacoes-historicos-alimentares.model';
import { SuplementoPaciente } from './../shared/model/suplemento-paciente.model';

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

  public previaHistoricoSelecionado: PreviaHistoricoAlimentar = new PreviaHistoricoAlimentar();
  public historicoAlimentar: HistoricoAlimentar = new HistoricoAlimentar();
  public previaHistoricosAlimentares: PreviaHistoricoAlimentar[] = [];
  public dataProximaAtualizacao: string;
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
    console.log(this.informacoesPreviasHistoricosAlimentares)

    this.colunasTabelaPreviaHistoricos = [
      { header: 'Cadastrado em', field: 'dataHoraCadastroHistoricoAlimentar', style: 'col-data-hora-cadastro' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];

    this.colunasTabelaSuplementosPaciente = [
      { header: 'Nome', field: 'suplemento', style: 'col-acoes' },
      { header: 'Dose', field: 'dose', style: 'col-dose' },
      { header: 'Forma de Preparo', field: 'formaPreparo', style: 'col-forma-preparo' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];
  }

  public buscarInformacoesPreviasHistoricosAlimentaresDoPaciente(): void {
    this.processandoOperacao = true;

    this.historicoAlimentarService.buscarInformacoesPreviasHistoricosAlimentaresDoPaciente(this.paciente.id)
      .subscribe((informacoesHistoricosPaciente: InformacoesPreviasHistoricosAlimentares) => {
        this.previaHistoricosAlimentares = informacoesHistoricosPaciente.previaHistoricosAlimentares;
        this.dataProximaAtualizacao = informacoesHistoricosPaciente.dataProximaAtualizacaoHistoricoAlimentar;
        this.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao buscar prévia dos históricos alimentares!');
      });
  }

  public buscarHistoricoAlimentarDoPaciente(): void {
    this.processandoOperacao = true;

    this.historicoAlimentarService.buscarHistoricoAlimentarDoPaciente(this.previaHistoricoSelecionado.id) 
      .subscribe((historicoAlimentar: HistoricoAlimentar) => {
        this.historicoAlimentar = historicoAlimentar;
        this.suplementosPaciente = historicoAlimentar.suplementosPaciente;
        this.processandoOperacao = false;
        this.abrirDialogInformacoes = true;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao buscar histórico alimentar!');
      });
  }

  public excluirHistoricoAlimentar(): void {
    this.processandoExclusao = true;

    this.historicoAlimentarService.excluirHistoricoAlimentar(this.previaHistoricoSelecionado.id)
      .subscribe(() => {
        this.processandoExclusao = false;
        this.resetarCampos();
        this.buscarInformacoesPreviasHistoricosAlimentaresDoPaciente();
        this.toasty.success('Histórico alimentar excluído com sucesso!');
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoExclusao = false;
        this.toasty.error('Erro ao excluir histórico alimentar!');
      });
  }

  public armazenarPreviaHistoricoSelecionadoParaDialogInformacoes(previaHistoricoAlimentar: PreviaHistoricoAlimentar): void {
    this.previaHistoricoSelecionado = previaHistoricoAlimentar;
    this.buscarHistoricoAlimentarDoPaciente();
  }

  public armazenarPreviaHistoricoSelecionadoParaDialogExclusao(previaHistoricoAlimentar: PreviaHistoricoAlimentar): void {
    this.previaHistoricoSelecionado = previaHistoricoAlimentar;
    this.abrirDialogExclusao = true;
  }

  public armazenarSuplementoSelecionado(suplementoPaciente: SuplementoPaciente): void {
    this.suplementoSelecionado = suplementoPaciente;
    this.abrirDialogSuplemento = true;
  }

  public habilitarSpinnerBotaoInformacoes(previaHistoricoAlimentar: PreviaHistoricoAlimentar): boolean {
    return this.processandoOperacao && this.previaHistoricoSelecionado.id === previaHistoricoAlimentar.id;
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
