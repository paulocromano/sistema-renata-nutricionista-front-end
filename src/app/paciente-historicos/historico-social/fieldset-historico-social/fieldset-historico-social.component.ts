import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ToastyComponent } from './../../../shared/toasty/toasty.component';
import { HistoricoSocial } from './../shared/model/historico-social.model';
import { PreviaHistoricoSocial } from '../shared/model/previa-historico-social.model';
import { Paciente } from './../../../paciente/shared/model/paciente.model';
import { HistoricoSocialService } from './../shared/service/historico-social.service';
import { InformacoesPreviasHistoricosSociais } from '../shared/model/informacoes-previas-historicos-sociais.model';

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

  public previaHistoricoSelecionado: PreviaHistoricoSocial = new PreviaHistoricoSocial();
  public historicoSocial: HistoricoSocial = new HistoricoSocial();
  public previaHistoricosSociais: PreviaHistoricoSocial[] = [];
  public dataProximaAtualizacao: string;

  public colunasTabelaPreviaHistoricos: any[];
  public colunasTabelaPatologiasPaciente: any[];
  public inputPesquisaPreviaHistoricos: string;
  public inputPesquisaPatologiasPaciente: string;
  public abrirDialogInformacoes: boolean = false;
  public abrirDialogExclusao: boolean = false;
  public processandoOperacao: boolean = false;

  constructor(private historicoSocialService: HistoricoSocialService) { }

  ngOnInit(): void {
    this.previaHistoricosSociais = this.informacoesPreviasHistoricosSociais.previaHistoricosSociais;
    this.dataProximaAtualizacao = this.informacoesPreviasHistoricosSociais.dataProximaAtualizacaoHistoricoSocial;

    this.colunasTabelaPreviaHistoricos = [
      { header: 'Cadastrado em', field: 'dataHoraCadastroHistoricoSocial', style: 'col-data-hora-cadastro' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];

    this.colunasTabelaPatologiasPaciente = [
      { header: 'Descrição', field: 'descricaoPatologia', style: 'col-descricaoPatologia' },
      { header: 'Tempo (anos)', field: 'quantosAnosPossuiPatologia', style: 'col-quantosAnosPossuiPatologia' }
    ];
  }

  public armazenarHistoricoSocialSelecionadoParaDialogInformacoes(previaHistoricoSelecionado: PreviaHistoricoSocial): void {
    this.previaHistoricoSelecionado = previaHistoricoSelecionado;
    this.buscarHistoricoSocialDoPaciente();
  }


  public buscarInformacoesPreviasHistoricosSociaisDoPaciente(): void {
    this.processandoOperacao = true;

    this.historicoSocialService.buscarInformacoesPreviasHistoricosSociaisDoPaciente(this.paciente.id)
      .subscribe((informacoesPreviasHistoricosSociais: InformacoesPreviasHistoricosSociais) => {
        this.previaHistoricosSociais = informacoesPreviasHistoricosSociais.previaHistoricosSociais
        this.dataProximaAtualizacao = informacoesPreviasHistoricosSociais.dataProximaAtualizacaoHistoricoSocial;
        this.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao buscar históricos sociais do paciente!');
      });
  }

  public buscarHistoricoSocialDoPaciente(): void {
    this.processandoOperacao = true;

    this.historicoSocialService.buscarHistoricoSocialDoPaciente(this.previaHistoricoSelecionado.id)
      .subscribe((historicoSocial: HistoricoSocial) => {
        this.historicoSocial = historicoSocial;
        this.processandoOperacao = false;
        this.abrirDialogInformacoes = true;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao buscar histórico social!');
      });
  }

  public armazenarHistoricoSocialSelecionadoParaDialogExclusao(previaHistoricoSelecionado: PreviaHistoricoSocial): void {
    this.previaHistoricoSelecionado = previaHistoricoSelecionado;
    this.abrirDialogExclusao = true;
  }

  public habilitarSpinnerBotaoInformacoes(previaHistoricoTabela: PreviaHistoricoSocial): boolean {
    return this.processandoOperacao && this.previaHistoricoSelecionado.id === previaHistoricoTabela.id;
  }

  public excluirHistoricoSocial(): void {
    this.processandoOperacao = true;

    this.historicoSocialService.excluirHistoricoSocialDoPaciente(this.previaHistoricoSelecionado.id)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.abrirDialogExclusao = false;
        this.resetarCampos();
        this.buscarInformacoesPreviasHistoricosSociaisDoPaciente();
        this.toasty.success('Histórico social excluído com sucesso!');
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao excluir histórico social!');
      });
  }

  public resetarCampos(): void {
    this.abrirDialogInformacoes = false;
    this.abrirDialogExclusao = false;
    
    this.historicoSocial = new HistoricoSocial();
    this.previaHistoricoSelecionado = new PreviaHistoricoSocial(); 
  }
}
