import { RetornoConsulta } from './../retorno-consulta/shared/model/retorno-consulta.model';
import { Consulta } from './../consulta/shared/model/consulta.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyComponent } from './../../shared/toasty/toasty.component';
import { InformacoesPreviasConsultaRetorno } from './shared/model/informacoes-previas-consulta-retorno.model';
import { ConsultaService } from './../consulta/shared/service/consulta.service';
import { TipoAtendimento } from './shared/model/tipo-atendimento.enum';
import { SituacaoConsulta } from './../consulta/shared/model/situacao-consulta.enum';
import { SituacaoRetornoConsulta } from './../retorno-consulta/shared/model/situacao-retorno-consulta.enum';

@Component({
  selector: 'app-tabela-consultas-retornos',
  templateUrl: './tabela-consultas-retornos.component.html',
  styleUrls: ['./tabela-consultas-retornos.component.css']
})

export class TabelaConsultasRetornosComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  public atendimentos: InformacoesPreviasConsultaRetorno[] = [];
  public atendimentoSelecionado: InformacoesPreviasConsultaRetorno = new InformacoesPreviasConsultaRetorno();
  public consultaSelecionada: Consulta = new Consulta();
  public retornoConsultaSelecionado: RetornoConsulta = new RetornoConsulta();

  public colunasTabela: any[];
  public inputPesquisa: string;
  public dataInicialPesquisaPeriodoAtendimento: string;
  public dataFinalPesquisaPeriodoAtendimento: string;
  public processandoOperacao: boolean = false;
  public exibirDialogInformacoesAtendimento: boolean = false;

  constructor(private consultaService: ConsultaService) { }

  ngOnInit(): void {
    this.colunasTabela = [
      { header: 'Data', field: 'dataAtendimento', style: 'col-data-atendimento' },
      { header: 'Nome do Paciente', field: 'nomePaciente', style: 'col-nome-paciente' },
      { header: 'Tipo', field: 'descricaoTipoAtendimento', style: 'col-tipo-atendimento' },
      { header: 'Situação', field: 'situacaoAtendimento', style: 'col-situacao' },
      { header: 'Horário', field: 'horarioAtendimento', style: 'col-horario-atendimento' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];

    this.listarAtendimentosPorPeriodoPadrao();
  }

  public listarAtendimentosPorPeriodoPadrao(): void {
    this.processandoOperacao = true;

    this.consultaService.listarAtendimentosPorPeriodoPadrao()
      .subscribe((atendimentos: InformacoesPreviasConsultaRetorno[]) => {
        this.atendimentos = atendimentos;
        this.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao listar os atendimentos!');
      });
  }

  public listarAtendimentosPorPeriodo(): void {
    this.processandoOperacao = true;

    this.consultaService.listarAtendimentosPorPeriodo(this.dataInicialPesquisaPeriodoAtendimento, this.dataFinalPesquisaPeriodoAtendimento)
      .subscribe((atendimentos: InformacoesPreviasConsultaRetorno[]) => {
        this.atendimentos = atendimentos;
        this.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao listar os atendimentos!');
      });
  }

  public armazenarAtendimentoSelecionadoParaDialogInformacoes(atendimento: InformacoesPreviasConsultaRetorno): void {
    this.atendimentoSelecionado = atendimento;
    this.exibirDialogInformacoesAtendimento = true;
  }

  public armazenarAtendimentoParaCancelamento(atendimento: InformacoesPreviasConsultaRetorno): void {
    this.atendimentoSelecionado = atendimento;
  }

  public desabilitarBotaoPesquisa(): boolean {
    return !(this.dataInicialPesquisaPeriodoAtendimento && !this.dataInicialPesquisaPeriodoAtendimento.includes('_')
      && this.dataFinalPesquisaPeriodoAtendimento && !this.dataFinalPesquisaPeriodoAtendimento.includes('_'));
  }

  public exibirBotaoVisualizarFichaDoAtendimento(atendimento: InformacoesPreviasConsultaRetorno): boolean {
      return this.verificarSituacaoAtendimentoParaExibirBotao(atendimento, SituacaoConsulta.CONSULTA_FINALIZADA,
        SituacaoRetornoConsulta.RETORNO_FINALIZADO);
  }

  public exibirBotaoReagendamentoDoAtendimento(atendimento: InformacoesPreviasConsultaRetorno): boolean {
    return this.verificarSituacaoAtendimentoParaExibirBotao(atendimento, SituacaoConsulta.AGUARDANDO_CONFIRMACAO,
      SituacaoRetornoConsulta.AGUARDANDO_CONFIRMACAO);
  }

  public exibirBotaoConfirmacaoDoAtendimento(atendimento: InformacoesPreviasConsultaRetorno): boolean {
    return this.verificarSituacaoAtendimentoParaExibirBotao(atendimento, SituacaoConsulta.AGUARDANDO_CONFIRMACAO,
      SituacaoRetornoConsulta.AGUARDANDO_CONFIRMACAO);
  }

  public exibirBotaoParaIniciarAtendimento(atendimento: InformacoesPreviasConsultaRetorno): boolean {
    return this.verificarSituacaoAtendimentoParaExibirBotao(atendimento, SituacaoConsulta.AGUARDANDO_ATENDIMENTO,
      SituacaoRetornoConsulta.AGUARDANDO_ATENDIMENTO);
  }

  public exibirBotaoParaCancelarAtendimento(atendimento: InformacoesPreviasConsultaRetorno): boolean {
    let descricaoSituacaoAtendimento: string = this.tipoAtendimentoIgualConsulta(atendimento) 
      ? SituacaoConsulta.CONSULTA_FINALIZADA : SituacaoRetornoConsulta.RETORNO_FINALIZADO;

    return atendimento.situacaoAtendimento !== descricaoSituacaoAtendimento;
  }

  private verificarSituacaoAtendimentoParaExibirBotao(atendimento: InformacoesPreviasConsultaRetorno, 
    situacaoConsulta: SituacaoConsulta, situacaoRetornoConsulta: SituacaoRetornoConsulta): boolean {

    let descricaoSituacaoAtendimento: string = this.tipoAtendimentoIgualConsulta(atendimento) 
      ? situacaoConsulta : situacaoRetornoConsulta;

    return atendimento.situacaoAtendimento === descricaoSituacaoAtendimento;
  }

  private tipoAtendimentoIgualConsulta(atendimento: InformacoesPreviasConsultaRetorno): boolean {
    return atendimento.codigoTipoAtendimento === TipoAtendimento.CONSULTA;
  }

  public definirMensagemTooltip(mensagem: string, atendimento: InformacoesPreviasConsultaRetorno): string {
    return mensagem + this.descricaoTipoAtendimento(atendimento);
  }

  private descricaoTipoAtendimento(atendimento: InformacoesPreviasConsultaRetorno): string {
    return (atendimento.codigoTipoAtendimento === TipoAtendimento.CONSULTA.valueOf() ? ' consulta' : ' retorno da consulta');
  }

  public resetarCampos(): void {
    this.exibirDialogInformacoesAtendimento = false;

    this.atendimentoSelecionado = new InformacoesPreviasConsultaRetorno();
  }
}
