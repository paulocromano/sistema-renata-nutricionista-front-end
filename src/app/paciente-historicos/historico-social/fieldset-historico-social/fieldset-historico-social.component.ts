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
import { PatologiaPacienteFORM } from './../shared/model/patologia-paciente.form';

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

  public formularioHistoricoSocial: HistoricoSocialFORM = new HistoricoSocialFORM();
  public patologias: SelectItem[] = [];
  public patologiasSelecionadasDropdown: SelectItem[] = [];
  public formularioPatologiasSelecionadas: PatologiaPacienteFORM[] = [];
  public estadoCivil: SelectItem[] = [];
  public consumoBebidasAlcoolicas: SelectItem[] = [];
  public consumoCigarro: SelectItem[] = [];
  public habitoIntestinal: SelectItem[] = [];
  public consistenciaFezes: SelectItem[] = [];
  public frequenciaDiurese: SelectItem[] = [];
  public coloracaoDiurese: SelectItem[] = [];

  public colunasTabelaPreviaHistoricos: any[];
  public colunasTabelaPatologiasPaciente: any[];
  public colunasTabelaPatologiasPacienteParaCadastrar: any[];
  public inputPesquisaPreviaHistoricos: string;
  public inputPesquisaPatologiasPaciente: string;
  public abrirDialogCadastro: boolean = false;
  public abrirDialogInformacoes: boolean = false;
  public abrirDialogExclusao: boolean = false;
  public abrirDialogExclusaoPatologiaPaciente: boolean = false;
  public abrirDialogCadastroPatologiasPaciente: boolean = false;
  public processandoOperacao: boolean = false;
  public processandoExclusao: boolean = false;

  constructor(private historicoSocialService: HistoricoSocialService) { }

  ngOnInit(): void {
    this.previaHistoricosSociais = this.informacoesPreviasHistoricosSociais.previaHistoricosSociais;
    this.dataProximaAtualizacao = this.informacoesPreviasHistoricosSociais.dataProximaAtualizacaoHistoricoSocial;
    this.historicoEstaDesatualizado = this.informacoesPreviasHistoricosSociais.historicoEstaDesatualizado;
    
    this.colunasTabelaPreviaHistoricos = [
      { header: 'Cadastrado em', field: 'dataHoraCadastroHistoricoSocial', style: 'col-data-hora-cadastro' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];

    this.colunasTabelaPatologiasPaciente = [
      { header: 'Descrição', field: 'descricaoPatologia', style: 'col-descricaoPatologia' },
      { header: 'Tempo (anos)', field: 'quantosAnosPossuiPatologia', style: 'col-quantosAnosPossuiPatologia' }
    ];

    this.colunasTabelaPatologiasPacienteParaCadastrar = [
      { header: 'Descrição', field: 'descricao', style: 'col-descricao' },
      { header: 'Tempo (anos)', field: 'quantosAnosPossuiPatologia', style: 'col-descricao' },
      { header: 'Ações', field: 'acoes', style: 'col-quantos-anosP-possui-patologia' }
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
        this.historicoEstaDesatualizado = informacoesPreviasHistoricosSociais.historicoEstaDesatualizado;
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
    if (this.informacoesParaCadastro && this.respostaSimNao) {
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
    this.formularioHistoricoSocial.patologiasPaciente = this.formularioPatologiasSelecionadas;

    this.historicoSocialService.cadastrarHistoricoSocialDoPaciente(this.paciente.id, this.formularioHistoricoSocial)
      .subscribe(() => {
        this.resetarCampos();
        this.toasty.success('Histórico social cadastrado com sucesso!');
        this.processandoOperacao = false;
        this.buscarInformacoesPreviasHistoricosSociaisDoPaciente();
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao cadastrar histórico social!');
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

  public alteracaoPatologiasSelecionadasParaCadastro(): void {
    this.formularioPatologiasSelecionadas = [];
    this.patologiasSelecionadasDropdown.forEach(patologia => this.formularioPatologiasSelecionadas.push({ 
      idPatologia: patologia.value, descricao: patologia.label, quantosAnosPossuiPatologia: 0 
    }));
  }

  public excluirPatologiaDoPaciente(patologiaPaciente: PatologiaPacienteFORM): void {
    const patologiaSelecionadaDropdown: SelectItem = this.patologiasSelecionadasDropdown.find(patologia => 
      patologia.value === patologiaPaciente.idPatologia);
    const indicePatologiaSelecionadaDropdown: number = this.patologiasSelecionadasDropdown.indexOf(patologiaSelecionadaDropdown);

    const indicePatologiaPacienteSelecionadaParaExcluir: number = this.formularioPatologiasSelecionadas.indexOf(patologiaPaciente);

    if (indicePatologiaSelecionadaDropdown > -1 && indicePatologiaPacienteSelecionadaParaExcluir > -1) {
      this.patologiasSelecionadasDropdown.splice(indicePatologiaSelecionadaDropdown, 1);
      this.formularioPatologiasSelecionadas.splice(indicePatologiaPacienteSelecionadaParaExcluir, 1);
    }
  }

  public cancelarPatologiasPaciente(): void {
    this.abrirDialogCadastroPatologiasPaciente = false;
    this.patologiasSelecionadasDropdown = [];
    this.formularioPatologiasSelecionadas = [];
  }

  public desabilitarBotaoConfirmarPatologiasPacienteSelecionadas(): boolean {
    return new Boolean(this.formularioPatologiasSelecionadas.find(patologia => patologia.quantosAnosPossuiPatologia <= 0)
      || this.formularioPatologiasSelecionadas?.length === 0).valueOf();
  }

  public alteracaoConsumoCigarro(event: any): void {
    if (this.formularioHistoricoSocial.consumoCigarro) {
      this.formularioHistoricoSocial.quantidadeCigarrosPorDia = null;
    }
  }

  public desabilitarBotaoCadastroHistorico(): boolean {
    let desabilitarBotao: boolean = this.processandoOperacao || !(this.formularioHistoricoSocial
      && this.formularioHistoricoSocial.profissao && this.formularioHistoricoSocial.estadoCivil
      && this.formularioHistoricoSocial.composicaoFamiliar && this.formularioHistoricoSocial.localRefeicoes
      && this.formularioHistoricoSocial.frequenciaConsumoBebidasAlcoolicas && this.formularioHistoricoSocial.consumoCigarro
      && this.formularioHistoricoSocial.habitoIntestinal && this.formularioHistoricoSocial.consistenciaFezes
      && this.formularioHistoricoSocial.frequenciaDiurese && this.formularioHistoricoSocial.coloracaoDiurese
      && this.formularioHistoricoSocial.horasSono);

    if (this.formularioHistoricoSocial.consumoCigarro) {
      if (this.formularioHistoricoSocial.consumoCigarro !== '2' && (!this.formularioHistoricoSocial.quantidadeCigarrosPorDia 
        || this.formularioHistoricoSocial.quantidadeCigarrosPorDia === 0)) {
        return true;
      }
    }
    else {
      return true;
    }

    if (this.paciente.sexo === 'Feminino') {
      if (this.formularioHistoricoSocial.menstruacaoNormal) {
        if (this.formularioHistoricoSocial.menstruacaoNormal === 'N') {
          return desabilitarBotao || !this.formularioHistoricoSocial.motivoAnormalidadeMenstruacao;
        }
        return desabilitarBotao;
      }
      else if (this.formularioHistoricoSocial.menopausa && this.formularioHistoricoSocial.quantosAnosEstaNaMenopausa) {
        return desabilitarBotao;
      }
      return true;
    }

    return desabilitarBotao;
  }

  public resetarMenstruacao(): void {
    this.formularioHistoricoSocial.menstruacaoNormal = null;
    this.formularioHistoricoSocial.motivoAnormalidadeMenstruacao = null;
  }

  public resetarMenopausa(): void {
    this.formularioHistoricoSocial.menopausa = null;
    this.formularioHistoricoSocial.quantosAnosEstaNaMenopausa = null;
  }

  public resetarCampos(): void {
    this.abrirDialogCadastro = false;
    this.abrirDialogInformacoes = false;
    this.abrirDialogExclusao = false;
    
    this.historicoSocial = new HistoricoSocial();
    this.previaHistoricoSelecionado = new PreviaHistoricoSocial(); 
    this.formularioHistoricoSocial = new HistoricoSocialFORM();
    this.patologiasSelecionadasDropdown = [];
    this.formularioPatologiasSelecionadas = [];
  }
}
