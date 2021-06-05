import { InformacoesCadastroQuestionario } from './../../../atendimento-paciente/shared/model/informacoes-cadastro-questionario.model';
import { FrequenciaAlimentar } from './../shared/model/frequencia-alimentar.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { Paciente } from './../../../paciente/shared/model/paciente.model';
import { ToastyComponent } from './../../../shared/toasty/toasty.component';
import { InformacoesPreviasQuestionarios } from './../shared/model/informacoes-previas-questionarios.model';
import { QuestionarioFrequenciaAlimentar } from './../shared/model/questionario-frequencia-alimentar.model';
import { PreviaQuestionarioFrequenciaAlimentar } from './../shared/model/previa-questionario-frequencia-alimentar.model';
import { QuestionarioFrequenciaAlimentarService } from './../shared/service/questionario-frequencia-alimentar.service';

@Component({
  selector: 'app-historico-questionario-frequencia-alimentar',
  templateUrl: './historico-questionario-frequencia-alimentar.component.html',
  styleUrls: ['./historico-questionario-frequencia-alimentar.component.css']
})

export class HistoricoQuestionarioFrequenciaAlimentarComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  @Input() public paciente: Paciente;
  @Input() public informacoesPreviasQuestionarios: InformacoesPreviasQuestionarios;
  @Input() public exibirBotaoCadastrarQuestionario: boolean = false;
  @Input() public informacoesCadastro: InformacoesCadastroQuestionario;

  public previaQuestionarioSelecionado: PreviaQuestionarioFrequenciaAlimentar = new PreviaQuestionarioFrequenciaAlimentar();
  public questionario: QuestionarioFrequenciaAlimentar = new QuestionarioFrequenciaAlimentar();
  public frequenciaAlimentar: FrequenciaAlimentar[] = [];
  public previaQuestionarios: PreviaQuestionarioFrequenciaAlimentar[] = [];
  public dataProximaAtualizacao: string;
  public historicoEstaDesatualizado: boolean = false;

  public colunasTabelaPreviaHistoricos: any[];
  public colunasTabelaFrequenciaAlimentar: any[];
  public inputPesquisaPreviaHistoricos: string;
  public inputPesquisaFrequenciaAlimentar: string;
  public abrirDialogInformacoes: boolean = false;
  public abrirDialogExclusao: boolean = false;
  public processandoOperacao: boolean = false;
  public processandoExclusao: boolean = false;

  constructor(private questionarioService: QuestionarioFrequenciaAlimentarService) { }

  ngOnInit(): void {
    this.previaQuestionarios = this.informacoesPreviasQuestionarios.previaQuestionariosFrequenciaAlimentar;
    this.dataProximaAtualizacao = this.informacoesPreviasQuestionarios.dataProximaAtualizacaoQuestionario;
    this.historicoEstaDesatualizado = this.informacoesPreviasQuestionarios.historicoEstaDesatualizado;

    this.colunasTabelaPreviaHistoricos = [
      { header: 'Cadastrado em', field: 'dataHoraCadastroQuestionario', style: 'col-data-hora-cadastro' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];

    this.colunasTabelaFrequenciaAlimentar = [
      { header: 'Descrição Alimento', field: 'descricaoAlimento', style: 'col-descricao-alimento' },
      { header: 'Frequência de Consumo', field: 'frequenciaConsumoAlimento', style: 'col-frequencia-consumo-alimento' }
    ];
  }

  public buscarInformacoesPreviasQuestionariosDoPaciente(): void {
    this.processandoOperacao = true;

    this.questionarioService.buscarInformacoesPreviasQuestionariosDoPaciente(this.paciente.id)
      .subscribe((informacoesPreviaQuestionarios: InformacoesPreviasQuestionarios) => {
        this.previaQuestionarios = informacoesPreviaQuestionarios.previaQuestionariosFrequenciaAlimentar;
        this.dataProximaAtualizacao = informacoesPreviaQuestionarios.dataProximaAtualizacaoQuestionario;
        this.historicoEstaDesatualizado = informacoesPreviaQuestionarios.historicoEstaDesatualizado;
        this.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao buscar informações prévia dos questionários de frequência alimentar!');
      });
  }

  public buscarQuestionarioFrequenciaAlimentarDoPaciente(previaQuestionario: PreviaQuestionarioFrequenciaAlimentar): void {
    this.processandoOperacao = true;
    previaQuestionario.processandoOperacao = true;

    this.questionarioService.buscarQuestionarioFrequenciaAlimentarDoPaciente(this.previaQuestionarioSelecionado.id)
      .subscribe((questionario: QuestionarioFrequenciaAlimentar) => {
        this.questionario = questionario;
        this.frequenciaAlimentar = questionario.frequenciaConsumoAlimentos;
        this.abrirDialogInformacoes = true;
        this.processandoOperacao = false;
        previaQuestionario.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        previaQuestionario.processandoOperacao = false;
        this.toasty.error('Erro ao buscar questionário de frequência alimentar!');
      });
  }

  public excluirQuestionarioFrequenciaAlimentar(): void {
    this.processandoExclusao = true;

    this.questionarioService.excluirQuestionarioFrequenciaAlimentar(this.previaQuestionarioSelecionado.id)
      .subscribe(() => {
        this.toasty.success('Questionário de frequência alimentar excluído com sucesso!');
        this.resetarCampos();
        this.buscarInformacoesPreviasQuestionariosDoPaciente();
        this.processandoExclusao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoExclusao = false;
        this.toasty.error('Erro ao excluir questionário de frequência alimentar!');
      });
  }

  public armazenarHistoricoQuestionarioSelecionadoParaDialogInformacoes(previaQuestionario: PreviaQuestionarioFrequenciaAlimentar): void {
    this.previaQuestionarioSelecionado = previaQuestionario;
    this.buscarQuestionarioFrequenciaAlimentarDoPaciente(previaQuestionario);
  }

  public armazenarHistoricoQuestionarioSelecionadoParaDialogExclusao(previaQuestionario: PreviaQuestionarioFrequenciaAlimentar): void {
    this.previaQuestionarioSelecionado = previaQuestionario;
    this.abrirDialogExclusao = true;
  }

  public resetarCampos(): void {
    this.abrirDialogInformacoes = false;
    this.abrirDialogExclusao = false;

    this.previaQuestionarioSelecionado = new PreviaQuestionarioFrequenciaAlimentar();
    this.questionario = new QuestionarioFrequenciaAlimentar();
    this.frequenciaAlimentar = [];
  }
}
