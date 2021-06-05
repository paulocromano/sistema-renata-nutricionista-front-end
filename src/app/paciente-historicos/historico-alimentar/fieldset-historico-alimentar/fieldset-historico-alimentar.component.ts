import { SelectItem } from 'primeng/api';
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
import { SuplementoPacienteFORM } from './../shared/model/suplemento-paciente.form';
import { HistoricoAlimentarFORM } from './../shared/model/historico-alimentar.form';

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
  public suplementosPaciente: SuplementoPaciente[] = [];
  public suplementoSelecionado: SuplementoPaciente = new SuplementoPaciente();

  public formularioCadastro: HistoricoAlimentarFORM = new HistoricoAlimentarFORM();
  public medicamentosDropdown: SelectItem[] = [];
  public medicamentosSelecionadosDropdown: SelectItem[] = [];
  public nomesMedicamentosSelecionados: string = '';
  public suplementosDropdown: SelectItem[] = [];
  public suplementosSelecionadosDropdown: SelectItem[] = [];
  public formularioSuplementosSelecionados: SuplementoPacienteFORM[] = [];


  public colunasTabelaPreviaHistoricos: any[];
  public colunasTabelaSuplementosPaciente: any[];
  public colunasTabelaCadastroSuplementosPaciente: any[];
  public inputPesquisaPreviaHistoricos: string;
  public inputPesquisaSuplementosPaciente: string;
  public abrirDialogInformacoes: boolean = false;
  public abrirDialogCadastro: boolean = false;
  public abrirDialogSelecaoSuplementosPaciente: boolean = false;
  public abrirDialogSuplemento: boolean = false;
  public abrirDialogExclusao: boolean = false;
  public processandoOperacao: boolean = false;
  public processandoExclusao: boolean = false;

  constructor(private historicoAlimentarService: HistoricoAlimentarService) { }

  ngOnInit(): void {
    this.previaHistoricosAlimentares = this.informacoesPreviasHistoricosAlimentares.previaHistoricosAlimentares;
    this.dataProximaAtualizacao = this.informacoesPreviasHistoricosAlimentares.dataProximaAtualizacaoHistoricoAlimentar;
    this.historicoEstaDesatualizado = this.informacoesPreviasHistoricosAlimentares.historicoEstaDesatualizado;

    this.colunasTabelaPreviaHistoricos = [
      { header: 'Cadastrado em', field: 'dataHoraCadastroHistoricoAlimentar', style: 'col-data-hora-cadastro' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];

    this.colunasTabelaSuplementosPaciente = [
      { header: 'Nome', field: 'suplemento', style: 'col-suplemento' },
      { header: 'Dose', field: 'dose', style: 'col-dose' },
      { header: 'Forma de Preparo', field: 'formaPreparo', style: 'col-forma-preparo' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];

    this.colunasTabelaCadastroSuplementosPaciente = [
      { header: 'Nome', field: 'nome', style: 'col-nome' },
      { header: 'Dose', field: 'dose', style: 'col-dose' },
      { header: 'Forma de Preparo', field: 'formaPreparo', style: 'col-forma-preparo' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];

    if (this.exibirBotaoCadastrarHistorico) {
      this.prepararDadosParaCadastroDoHistorico();
    }
  }

  public buscarInformacoesPreviasHistoricosAlimentaresDoPaciente(): void {
    this.processandoOperacao = true;

    this.historicoAlimentarService.buscarInformacoesPreviasHistoricosAlimentaresDoPaciente(this.paciente.id)
      .subscribe((informacoesHistoricosPaciente: InformacoesPreviasHistoricosAlimentares) => {
        this.previaHistoricosAlimentares = informacoesHistoricosPaciente.previaHistoricosAlimentares;
        this.dataProximaAtualizacao = informacoesHistoricosPaciente.dataProximaAtualizacaoHistoricoAlimentar;
        this.historicoEstaDesatualizado = informacoesHistoricosPaciente.historicoEstaDesatualizado;
        this.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao buscar prévia dos históricos alimentares!');
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

  public cadastrarHistoricoAlimentar(): void {
    this.processandoOperacao = true;
    this.formularioCadastro.idMedicamentos = this.medicamentosSelecionadosDropdown.map(medicamento => medicamento.value);
    this.formularioCadastro.suplementosPaciente = this.formularioSuplementosSelecionados;

    this.historicoAlimentarService.cadastrarHistoricoAlimentarDoPaciente(this.paciente.id, this.formularioCadastro)
      .subscribe(() => {
        this.toasty.success('Histórico alimentar cadastrado com sucesso!');
        this.resetarCampos();
        this.processandoOperacao = false;
        this.buscarInformacoesPreviasHistoricosAlimentaresDoPaciente();
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao cadastrar histórico alimentar!');
      });
  }

  private prepararDadosParaCadastroDoHistorico(): void {
    this.informacoesParaCadastro.medicamentos.forEach(medicamento => this.medicamentosDropdown.push({
      label: medicamento.nome, value: medicamento.id
    }));

    this.informacoesParaCadastro.suplementos.forEach(suplemento => this.suplementosDropdown.push({
      label: suplemento.nome, value: suplemento.id
    }));
  }

  public alteracaoMedicamentosSelecionadasParaCadastro(): void {
    this.nomesMedicamentosSelecionados = '';

    if (this.medicamentosSelecionadosDropdown.length > 0) {
      this.medicamentosSelecionadosDropdown.forEach(medicamento => this.nomesMedicamentosSelecionados += medicamento.label + ', ');
      this.nomesMedicamentosSelecionados = this.nomesMedicamentosSelecionados.substring(0, this.nomesMedicamentosSelecionados.length - 2);
    }
  }

  public desabilitarBotaoConfirmarCadastroHistoricoAlimentar(): boolean {
    return this.processandoOperacao || !this.formularioCadastro.consumoAgua?.trim();
  }

  public alteracaoSuplementosSelecionadosParaCadastro(): void {
    this.formularioSuplementosSelecionados = [];
    this.suplementosSelecionadosDropdown.forEach(suplemento => this.formularioSuplementosSelecionados.push({
      nome: suplemento.label, idSuplemento: suplemento.value, dose: null, formaPreparo: null
    }));
  }

  public excluirSuplementoDoPaciente(suplementoPaciente: SuplementoPacienteFORM): void {
    const suplementoSelecionadoDropdown: SelectItem = this.suplementosSelecionadosDropdown.find(suplemento => 
      suplemento.value === suplementoPaciente.idSuplemento);
    const indiceSuplementoSelecionadoDropdown: number = this.suplementosSelecionadosDropdown.indexOf(suplementoSelecionadoDropdown);

    const indiceSuplementoPacienteSelecionadoParaExcluir: number = this.formularioSuplementosSelecionados.indexOf(suplementoPaciente);

    if (indiceSuplementoSelecionadoDropdown > -1 && indiceSuplementoPacienteSelecionadoParaExcluir > -1) {
      this.suplementosSelecionadosDropdown.splice(indiceSuplementoSelecionadoDropdown, 1);
      this.formularioSuplementosSelecionados.splice(indiceSuplementoPacienteSelecionadoParaExcluir, 1);
    }
  }

  public cancelarSuplementosPaciente(): void {
    this.abrirDialogSelecaoSuplementosPaciente = false;
    this.suplementosSelecionadosDropdown = [];
    this.formularioSuplementosSelecionados = [];
  }

  public desabilitarBotaoConfirmarSuplementosSelecionadosDoPaciente(): boolean {
    return new Boolean(this.formularioSuplementosSelecionados.find(suplemento => !suplemento.dose?.trim() || !suplemento.formaPreparo?.trim())
      || this.formularioSuplementosSelecionados?.length === 0).valueOf();
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
    this.abrirDialogCadastro = false;
    this.abrirDialogExclusao = false;

    this.previaHistoricoSelecionado = new PreviaHistoricoAlimentar();
    this.historicoAlimentar = new HistoricoAlimentar();
    this.suplementosPaciente = [];
    this.suplementoSelecionado = new SuplementoPaciente();
    this.formularioCadastro = new HistoricoAlimentarFORM();
    this.medicamentosSelecionadosDropdown = [];
    this.nomesMedicamentosSelecionados = '';
  }
}
