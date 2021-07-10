import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ToastyComponent } from './../../../shared/toasty/toasty.component';
import { Paciente } from './../../../paciente/shared/model/paciente.model';
import { HistoricoPatologiaFamiliares } from './../shared/model/historico-patologia-familiares.model';
import { HistoricoPatologiaFamiliaresPorData } from './../shared/model/historico-patologia-familiares-por-data.model';
import { HistoricoPatologiaFamiliaresService } from './../shared/service/historico-patologia-familiares.service';
import { PreviaHistoricoPatologiaFamiliaresPorData } from './../shared/model/previa-historico-patologia-familiares-por-data.model';
import { InformacoesPreviasHistoricosFamiliaresPorData } from './../shared/model/informacoes-previas-historicos-familiares-data.model';
import { DadosEnum } from './../../../shared/model/dados-enum.model';

@Component({
  selector: 'app-fieldset-historico-patologia-familiares',
  templateUrl: './fieldset-historico-patologia-familiares.component.html',
  styleUrls: ['./fieldset-historico-patologia-familiares.component.css']
})

export class FieldsetHistoricoPatologiaFamiliaresComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  @Input() public paciente: Paciente;
  @Input() public informacoesPreviasHistoricosFamiliaresPorData: InformacoesPreviasHistoricosFamiliaresPorData;
  @Input() public exibirBotaoCadastrarHistorico: boolean = false;
  @Input() public patologias: DadosEnum[];

  public previaHistoricoSelecionado: PreviaHistoricoPatologiaFamiliaresPorData = new PreviaHistoricoPatologiaFamiliaresPorData();
  public previaHistoricosPatologiaFamiliares: PreviaHistoricoPatologiaFamiliaresPorData[] = [];
  public dataProximaAtualizacao: string;
  public historicoEstaDesatualizado: boolean = false;
  public possuiHistorico: boolean = false;

  public previaHistoricoPorDataSelecionado: PreviaHistoricoPatologiaFamiliaresPorData = new PreviaHistoricoPatologiaFamiliaresPorData();
  public historicoPatologiaFamiliaresPorData: HistoricoPatologiaFamiliaresPorData = new HistoricoPatologiaFamiliaresPorData();
  public patologiasFamiliares: HistoricoPatologiaFamiliares[] = [];

  public colunasTabelaPreviaHistoricosPatologiaFamiliaresPorData: any[];
  public colunasTabelaHistoricosPatologiaFamiliares: any[];
  public inputPesquisaPreviaHistoricos: string;
  public abrirDialogInformacoes: boolean = false;
  public abrirDialogExclusao: boolean = false;
  public processandoOperacao: boolean = false;
  public processandoExclusao: boolean = false;
  
  constructor(private historicoPatologiaFamiliaresService: HistoricoPatologiaFamiliaresService) { }

  ngOnInit(): void {
    this.previaHistoricosPatologiaFamiliares = this.informacoesPreviasHistoricosFamiliaresPorData.previaHistoricosPatologiaFamiliaresPorData;
    this.dataProximaAtualizacao = this.informacoesPreviasHistoricosFamiliaresPorData.dataProximaAtualizacaoHistoricoPatologiasFamiliares;
    this.historicoEstaDesatualizado = this.informacoesPreviasHistoricosFamiliaresPorData.historicoEstaDesatualizado;

    this.colunasTabelaPreviaHistoricosPatologiaFamiliaresPorData = [
      { header: 'Cadastrado em', field: 'dataHoraCadastroPatologiasFamiliaresPorData', style: 'col-data-hora-cadastro' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];

    this.colunasTabelaHistoricosPatologiaFamiliares = [
      { header: 'Patologia', field: 'descricaoPatologiaFamiliares', style: 'col-descricao-patologia-familiares' },
      { header: 'Pai', field: 'pai', style: 'col-pai' },
      { header: 'Mãe', field: 'mae', style: 'col-mae' },
      { header: 'Avôs', field: 'avosMasculinos', style: 'col-avos-masculinos' },
      { header: 'Avós', field: 'avosFemininos', style: 'col-avos-femininos' },
      { header: 'Tios', field: 'tios', style: 'col-tios' },
      { header: 'Tias', field: 'tias', style: 'col-tias' }
    ];
  }

  public buscarInformacoesPreviasHistoricosPatologiasFamiliaresPorDataDoPaciente(): void {
    this.processandoOperacao = true;

    this.historicoPatologiaFamiliaresService.buscarInformacoesPreviasHistoricosPatologiasFamiliaresPorDataDoPaciente(this.paciente.id)
      .subscribe((informacoesPreviasHistoricos: InformacoesPreviasHistoricosFamiliaresPorData) => {
        this.previaHistoricosPatologiaFamiliares = informacoesPreviasHistoricos.previaHistoricosPatologiaFamiliaresPorData;
        this.dataProximaAtualizacao = informacoesPreviasHistoricos.dataProximaAtualizacaoHistoricoPatologiasFamiliares;
        this.historicoEstaDesatualizado = informacoesPreviasHistoricos.historicoEstaDesatualizado;
        this.possuiHistorico = informacoesPreviasHistoricos.possuiHistorico;
        this.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao buscar prévia dos históricos de patologia dos familiares!');
      });
  }

  public buscarHistoricoPatologiaFamiliaresPorDataDoPaciente(
    previaHistoricoPatologiaFamiliares: PreviaHistoricoPatologiaFamiliaresPorData): void {
      
    this.processandoOperacao = true;
    previaHistoricoPatologiaFamiliares.processandoOperacao = true;

    this.historicoPatologiaFamiliaresService.buscarHistoricoPatologiaFamiliaresPorDataDoPaciente(this.previaHistoricoPorDataSelecionado.id)
      .subscribe((historico: HistoricoPatologiaFamiliaresPorData) => {
        this.historicoPatologiaFamiliaresPorData = historico;
        this.patologiasFamiliares = historico.patologiasFamiliares;
        this.processandoOperacao = false;
        this.abrirDialogInformacoes = true;
        previaHistoricoPatologiaFamiliares.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        previaHistoricoPatologiaFamiliares.processandoOperacao = false;
        this.toasty.error('Erro ao buscar histórico de patologia dos familiares!');
      });
  }

  public excluirHistoricoPatologiaFamiliaresPorData(): void {
    this.processandoExclusao = true;

    this.historicoPatologiaFamiliaresService.excluirHistoricoPatologiaFamiliaresPorData(this.previaHistoricoPorDataSelecionado.id)
      .subscribe(() => {
        this.processandoExclusao = false;
        this.resetarCampos();
        this.buscarInformacoesPreviasHistoricosPatologiasFamiliaresPorDataDoPaciente();
        this.toasty.success('Histórico de patologia dos familiares excluído com sucesso!');
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoExclusao = false;
        this.toasty.error('Erro ao excluir histórico de patologia dos familiares!');
      });
  }
  
  public eventoCadastroPatologiaFamiliares(historicoCadastrado: boolean): void {
    if (historicoCadastrado) {
      this.buscarInformacoesPreviasHistoricosPatologiasFamiliaresPorDataDoPaciente();
    }
  }

  public armazenarHistoricoSelecionadoParaDialogInformacoes(
    previaHistoricoPatologiaFamiliares: PreviaHistoricoPatologiaFamiliaresPorData): void {

    this.previaHistoricoPorDataSelecionado = previaHistoricoPatologiaFamiliares;
    this.buscarHistoricoPatologiaFamiliaresPorDataDoPaciente(previaHistoricoPatologiaFamiliares);
  }

  public armazenarHistoricoSelecionadoParaDialogExclusao(
    previaHistoricoPatologiaFamiliares: PreviaHistoricoPatologiaFamiliaresPorData): void {

      this.previaHistoricoPorDataSelecionado = previaHistoricoPatologiaFamiliares;
      this.abrirDialogExclusao = true;
  }

  public resetarCampos(): void {
    this.abrirDialogInformacoes = false;
    this.abrirDialogExclusao = false;

    this.previaHistoricoPorDataSelecionado = new PreviaHistoricoPatologiaFamiliaresPorData();
    this.historicoPatologiaFamiliaresPorData = new HistoricoPatologiaFamiliaresPorData();
    this.patologiasFamiliares = [];
  }
}
