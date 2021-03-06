import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { SelectItem } from 'primeng/api';

import { ToastyComponent } from './../../../shared/toasty/toasty.component';
import { HistoricoSocial } from './../shared/model/historico-social.model';
import { PreviaHistoricoSocial } from '../shared/model/previa-historico-social.model';
import { Paciente } from './../../../paciente/shared/model/paciente.model';
import { HistoricoSocialService } from './../shared/service/historico-social.service';
import { InformacoesPreviasHistoricosSociais } from '../shared/model/informacoes-previas-historicos-sociais.model';
import { InformacoesCadastroHistoricoSocial } from './../../../atendimento-paciente/shared/model/informacoes-cadastro-historico-social.model';

@Component({
  selector: 'app-fieldset-historico-social',
  templateUrl: './fieldset-historico-social.component.html',
  styleUrls: ['./fieldset-historico-social.component.css']
})

export class FieldsetHistoricoSocialComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  @Input() public paciente: Paciente;
  @Input() public informacoesPreviasHistoricosSociais: InformacoesPreviasHistoricosSociais;
  @Input() public exibirBotaoCadastrarHistorico: boolean = false;
  @Input() public informacoesParaCadastro: InformacoesCadastroHistoricoSocial;
  @Input() public respostaSimNao: SelectItem[];

  public previaHistoricoSelecionado: PreviaHistoricoSocial = new PreviaHistoricoSocial();
  public historicoSocial: HistoricoSocial = new HistoricoSocial();
  public previaHistoricosSociais: PreviaHistoricoSocial[] = [];
  public dataProximaAtualizacao: string;
  public historicoEstaDesatualizado: boolean = false;
  public possuiHistorico: boolean = false;

  public colunasTabelaPreviaHistoricos: any[];
  public colunasTabelaColoracoesDiuresePaciente: any[];
  public colunasTabelaPatologiasPaciente: any[];
  public inputPesquisaPreviaHistoricos: string;
  public inputPesquisaPatologiasPaciente: string;
  public abrirDialogInformacoes: boolean = false;
  public abrirDialogExclusao: boolean = false;
  public abrirDialogExclusaoPatologiaPaciente: boolean = false;
  public processandoOperacao: boolean = false;
  public processandoExclusao: boolean = false;

  constructor(private historicoSocialService: HistoricoSocialService) { }

  ngOnInit(): void {
    this.previaHistoricosSociais = this.informacoesPreviasHistoricosSociais.previaHistoricosSociais;
    this.dataProximaAtualizacao = this.informacoesPreviasHistoricosSociais.dataProximaAtualizacaoHistoricoSocial;
    this.historicoEstaDesatualizado = this.informacoesPreviasHistoricosSociais.historicoEstaDesatualizado;
    this.possuiHistorico = this.informacoesPreviasHistoricosSociais.possuiHistorico;
    
    this.colunasTabelaPreviaHistoricos = [
      { header: 'Cadastrado em', field: 'dataHoraCadastroHistoricoSocial', style: 'col-data-hora-cadastro' },
      { header: 'A????es', field: 'acoes', style: 'col-acoes' }
    ];

    this.colunasTabelaColoracoesDiuresePaciente = [
      { header: 'Colora????o', field: 'imagemColoracaoDiurese', style: 'col-coloracao' },
      { header: 'Descri????o', field: 'imagemColoracaoDiurese', style: 'col-descricao' },
    ];

    this.colunasTabelaPatologiasPaciente = [
      { header: 'Descri????o', field: 'descricaoPatologia', style: 'col-descricaoPatologia' },
      { header: 'Tempo (anos)', field: 'quantosAnosPossuiPatologia', style: 'col-quantosAnosPossuiPatologia' }
    ];
  }

  public armazenarHistoricoSocialSelecionadoParaDialogInformacoes(previaHistoricoSelecionado: PreviaHistoricoSocial): void {
    this.previaHistoricoSelecionado = previaHistoricoSelecionado;

    this.buscarHistoricoSocialDoPaciente(previaHistoricoSelecionado);
  }


  public buscarInformacoesPreviasHistoricosSociaisDoPaciente(): void {
    this.processandoOperacao = true;

    this.historicoSocialService.buscarInformacoesPreviasHistoricosSociaisDoPaciente(this.paciente.id)
      .subscribe((informacoesPreviasHistoricosSociais: InformacoesPreviasHistoricosSociais) => {
        this.previaHistoricosSociais = informacoesPreviasHistoricosSociais.previaHistoricosSociais
        this.dataProximaAtualizacao = informacoesPreviasHistoricosSociais.dataProximaAtualizacaoHistoricoSocial;
        this.historicoEstaDesatualizado = informacoesPreviasHistoricosSociais.historicoEstaDesatualizado;
        this.possuiHistorico = informacoesPreviasHistoricosSociais.possuiHistorico;
        this.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao buscar hist??ricos sociais do paciente!');
      });
  }

  public buscarHistoricoSocialDoPaciente(previaHistoricoSelecionado: PreviaHistoricoSocial): void {
    this.processandoOperacao = true;
    previaHistoricoSelecionado.processandoOperacao = true;

    this.historicoSocialService.buscarHistoricoSocialDoPaciente(this.previaHistoricoSelecionado.id)
      .subscribe((historicoSocial: HistoricoSocial) => {
        this.historicoSocial = historicoSocial;
        this.processandoOperacao = false;
        this.abrirDialogInformacoes = true;
        previaHistoricoSelecionado.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        previaHistoricoSelecionado.processandoOperacao = false;
        this.toasty.error('Erro ao buscar hist??rico social!');
      });
  }

  public armazenarHistoricoSocialSelecionadoParaDialogExclusao(previaHistoricoSelecionado: PreviaHistoricoSocial): void {
    this.previaHistoricoSelecionado = previaHistoricoSelecionado;
    this.abrirDialogExclusao = true;
  }

  public excluirHistoricoSocial(): void {
    this.processandoExclusao = true;

    this.historicoSocialService.excluirHistoricoSocialDoPaciente(this.previaHistoricoSelecionado.id)
      .subscribe(() => {
        this.processandoExclusao = false;
        this.abrirDialogExclusao = false;
        this.resetarCampos();
        this.buscarInformacoesPreviasHistoricosSociaisDoPaciente();
        this.toasty.success('Hist??rico social exclu??do com sucesso!');
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoExclusao = false;
        this.toasty.error('Erro ao excluir hist??rico social!');
      });
  }

  public eventoCadastroHistorico(historicoSocialCadastrado: boolean): void {
    if (historicoSocialCadastrado) {
      this.buscarInformacoesPreviasHistoricosSociaisDoPaciente();
    }
  }

  public resetarCampos(): void {
    this.abrirDialogInformacoes = false;
    this.abrirDialogExclusao = false;
    
    this.historicoSocial = new HistoricoSocial();
    this.previaHistoricoSelecionado = new PreviaHistoricoSocial(); 
  }
}
