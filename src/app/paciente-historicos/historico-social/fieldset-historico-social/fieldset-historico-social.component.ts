import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { SelectItem } from 'primeng/api';

import { ToastyComponent } from './../../../shared/toasty/toasty.component';
import { HistoricoSocial } from './../shared/model/historico-social.model';
import { PreviaHistoricoSocial } from '../shared/model/previa-historico-social.model';
import { Paciente } from './../../../paciente/shared/model/paciente.model';
import { HistoricoSocialService } from './../shared/service/historico-social.service';
import { InformacoesPreviasHistoricosSociais } from '../shared/model/informacoes-previas-historicos-sociais.model';
import { HistoricoSocialFORM } from './../shared/model/historico-social.form';
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

  public previaHistoricoSelecionado: PreviaHistoricoSocial = new PreviaHistoricoSocial();
  public historicoSocial: HistoricoSocial = new HistoricoSocial();
  public previaHistoricosSociais: PreviaHistoricoSocial[] = [];
  public dataProximaAtualizacao: string;

  public formularioHistoricoSocial: HistoricoSocialFORM = new HistoricoSocialFORM();
  public patologias: SelectItem[] = [];
  public estadoCivil: SelectItem[] = [];
  public consumoBebidasAlcoolicas: SelectItem[] = [];
  public consumoCigarro: SelectItem[] = [];
  public habitoIntestinal: SelectItem[] = [];
  public consistenciaFezes: SelectItem[] = [];
  public frequenciaDiurese: SelectItem[] = [];
  public coloracaoDiurese: SelectItem[] = [];

  public colunasTabelaPreviaHistoricos: any[];
  public colunasTabelaPatologiasPaciente: any[];
  public inputPesquisaPreviaHistoricos: string;
  public inputPesquisaPatologiasPaciente: string;
  public abrirDialogCadastro: boolean = false;
  public abrirDialogInformacoes: boolean = false;
  public abrirDialogExclusao: boolean = false;
  public processandoOperacao: boolean = false;
  public processandoExclusao: boolean = false;

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

    if (this.exibirBotaoCadastrarHistorico) {
      this.prepararDadosParaCadastroDoHistorico();
    }
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
        this.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao buscar históricos sociais do paciente!');
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
        this.toasty.error('Erro ao buscar histórico social!');
      });
  }

  private prepararDadosParaCadastroDoHistorico(): void {
    if (this.informacoesParaCadastro) {
      this.informacoesParaCadastro.patologias.forEach(patologia => this.patologias.push({ label: patologia.descricao, value: patologia.id }));
      this.converterParaListagemDropdown(this.estadoCivil, this.informacoesParaCadastro.estadoCivil);
      this.converterParaListagemDropdown(this.consumoBebidasAlcoolicas, this.informacoesParaCadastro.consumoBebidasAlcoolicas);
      this.converterParaListagemDropdown(this.consumoCigarro, this.informacoesParaCadastro.consumoCigarro);
      this.converterParaListagemDropdown(this.habitoIntestinal, this.informacoesParaCadastro.habitoIntestinal);
      this.converterParaListagemDropdown(this.consistenciaFezes, this.informacoesParaCadastro.consistenciaFezes);
      this.converterParaListagemDropdown(this.frequenciaDiurese, this.informacoesParaCadastro.frequenciaDiurese);
      this.converterParaListagemDropdown(this.coloracaoDiurese, this.informacoesParaCadastro.coloracaoDiurese);
    }
  }

  public cadastrarHistoricoSocial(): void {
    this.processandoOperacao = true;
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
        this.toasty.success('Histórico social excluído com sucesso!');
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoExclusao = false;
        this.toasty.error('Erro ao excluir histórico social!');
      });
  }

  private converterParaListagemDropdown(selectItem: SelectItem[], lista: any[]): void {
    lista.forEach(item => selectItem.push({ label: item.descricao, value: item.codigo }));
  }

  public resetarCampos(): void {
    this.abrirDialogCadastro = false;
    this.abrirDialogInformacoes = false;
    this.abrirDialogExclusao = false;
    
    this.historicoSocial = new HistoricoSocial();
    this.previaHistoricoSelecionado = new PreviaHistoricoSocial(); 
    this.formularioHistoricoSocial = new HistoricoSocialFORM();
  }
}
