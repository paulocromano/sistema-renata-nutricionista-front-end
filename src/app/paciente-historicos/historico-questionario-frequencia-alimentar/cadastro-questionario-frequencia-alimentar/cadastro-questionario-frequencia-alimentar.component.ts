import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';

import { ToastyComponent } from './../../../shared/toasty/toasty.component';
import { DadosEnum } from './../../../shared/model/dados-enum.model';
import { QuestionarioFrequenciaAlimentarFORM } from './../shared/model/questionario-frequencia-alimentar.form';
import { QuestionarioFrequenciaAlimentarService } from './../shared/service/questionario-frequencia-alimentar.service';
import { Paciente } from './../../../paciente/shared/model/paciente.model';
import { InformacoesCadastroQuestionario } from './../../../atendimento-paciente/shared/model/informacoes-cadastro-questionario.model';
import { FrequenciaAlimentarFORM } from '../shared/model/frequencia-alimentar.form';

@Component({
  selector: 'app-cadastro-questionario-frequencia-alimentar',
  templateUrl: './cadastro-questionario-frequencia-alimentar.component.html',
  styleUrls: ['./cadastro-questionario-frequencia-alimentar.component.css']
})

export class CadastroQuestionarioFrequenciaAlimentarComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  @Input() public exibirBotaoCadastrarQuestionario: boolean = false;
  @Input() public paciente: Paciente;
  @Input() public informacoesCadastro: InformacoesCadastroQuestionario;
  @Output() public cadastroQuestionario: EventEmitter<boolean> = new EventEmitter();

  public formularioQuestionario: QuestionarioFrequenciaAlimentarFORM = new QuestionarioFrequenciaAlimentarFORM();
  public frequenciaAlimentar: FrequenciaAlimentarFORM[] = [];
  public frequenciaConsumoAlimento: DadosEnum[] = [];
  public consumoLeite: string[] = [];
  public consumoCarneVermelha: string[] = [];
  public consumoFrango: string[] = [];
  public consumoPeixe: string[] = [];

  public colunasTabela: any[];
  public processandoOperacao: boolean = false;
  public abrirDialogCadastro: boolean = false;

  constructor(private questionarioService: QuestionarioFrequenciaAlimentarService) { }

  ngOnInit(): void {
    if (this.exibirBotaoCadastrarQuestionario && this.informacoesCadastro) {
      this.frequenciaConsumoAlimento = this.informacoesCadastro.frequenciaConsumoAlimento;
    }
    
    this.colunasTabela = [
      { header: 'Descrição Alimento', field: 'descricaoAlimento', style: 'col-descricao-alimento' },
      { header: 'Frequência de Consumo', field: 'frequenciaConsumoAlimento', style: 'col-frequencia-consumo-alimento' }
    ];
  }

  public cadastrarQuestionario(): void {
    this.processandoOperacao = true;
    this.prepararDadosFormularioParaEfetivarCadastro();

    this.questionarioService.cadastrarQuestionarioFrequenciaAlimentar(this.paciente.id, this.formularioQuestionario)
      .subscribe(() => {
        this.resetarCampos();
        this.toasty.success('Questionário cadastrado com sucesso!');
        this.processandoOperacao = false;
        this.cadastroQuestionario.emit(true);
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao cadastrar questionário!');
        this.cadastroQuestionario.emit(false);
      })
  }

  private prepararDadosFormularioParaEfetivarCadastro(): void {
    this.formularioQuestionario.frequenciaConsumoAlimentos = this.frequenciaAlimentar;
    
    if (this.consumoLeite && this.consumoLeite.length > 0) {
      this.formularioQuestionario.consumoTipoLeite = '';
      this.consumoLeite.forEach(consumo => this.formularioQuestionario.consumoTipoLeite += consumo + ';');
    }

    if (this.consumoCarneVermelha && this.consumoCarneVermelha.length > 0) {
      this.formularioQuestionario.consumoCarneVermelha = '';
      this.consumoCarneVermelha.forEach(consumo => this.formularioQuestionario.consumoCarneVermelha += consumo + ';');
    }

    if (this.consumoFrango && this.consumoFrango.length > 0) {
      this.formularioQuestionario.consumoFrango = '';
      this.consumoFrango.forEach(consumo => this.formularioQuestionario.consumoFrango += consumo + ';');
    }

    if (this.consumoPeixe && this.consumoPeixe.length > 0) {
      this.formularioQuestionario.consumoPeixe = '';
      this.consumoPeixe.forEach(consumo => this.formularioQuestionario.consumoPeixe += consumo + ';');
    }
  }

  public abrirDialogQuestionario(): void {
    this.informacoesCadastro.alimentosFrequenciaAlimentar.forEach(alimento => this.frequenciaAlimentar.push({
      descricaoAlimento: alimento.descricao, idAlimentoFrequenciaAlimentar: alimento.id, frequenciaConsumoAlimento: null
    }));

    this.abrirDialogCadastro = true;
  }

  public pacienteConsomeSucoOuRefrigerante(): boolean {
    return new Boolean(this.frequenciaAlimentar.find(alimento => 
      (alimento.descricaoAlimento.toLocaleLowerCase().includes('suco') && alimento.frequenciaConsumoAlimento 
        && alimento.frequenciaConsumoAlimento !== 'N')
    || (alimento.descricaoAlimento.toLocaleLowerCase().includes('refrigerantes')
        && alimento.frequenciaConsumoAlimento && alimento.frequenciaConsumoAlimento !== 'N'))).valueOf();
  }

  public pacienteConsomeLeite(): boolean {
    return this.pacienteConsomeAlimento('leite');
  }

  public validarOpcaoConsumoLeiteSelecionada(event: any): void {
    const opcaoQualquerUm: string = '5';

    if (this.consumoLeite.includes(opcaoQualquerUm)) {
      this.consumoLeite = [];
      this.consumoLeite.push(opcaoQualquerUm);
    }
  }

  public pacienteConsomeCarneVermelha(): boolean {
    return this.pacienteConsomeAlimento('carne vermelha');
  }

  public pacienteConsomeFrango(): boolean {
    return this.pacienteConsomeAlimento('frango');
  }

  public pacienteConsomePeixe(): boolean {
    return this.pacienteConsomeAlimento('peixe');
  }

  private pacienteConsomeAlimento(alimentoConsumo: string): boolean {
    return new Boolean(this.frequenciaAlimentar.find(alimento => 
      alimento.descricaoAlimento.toLocaleLowerCase().includes(alimentoConsumo.toLocaleLowerCase()) 
        && alimento.frequenciaConsumoAlimento && alimento.frequenciaConsumoAlimento !== 'N')).valueOf();
  }

  public alteracaoFrequenciaConsumoAlimento(event: any, alimento: FrequenciaAlimentarFORM): void {
    const descricaoAlimento: string = alimento.descricaoAlimento.toLocaleLowerCase();

    if((descricaoAlimento.includes('suco') || descricaoAlimento.includes('refrigerantes')) && this.pacienteNuncaConsomeSucoOuRefrigerante()) {
      this.formularioQuestionario.consumoTipoBebida = null;
    }
    else if (descricaoAlimento.includes('leite') && this.verificarSePacienteConsomeAlimento(alimento)) {
      this.consumoLeite = [];
    }
    else if (descricaoAlimento.includes('carne vermelha') && this.verificarSePacienteConsomeAlimento(alimento)) {
      this.consumoCarneVermelha = [];
    }
    else if (descricaoAlimento.includes('frango') && this.verificarSePacienteConsomeAlimento(alimento)) {
      this.consumoFrango = [];
    }
    else if (descricaoAlimento.includes('peixe') && this.verificarSePacienteConsomeAlimento(alimento)) {
      this.consumoPeixe = [];
    }
  }

  private pacienteNuncaConsomeSucoOuRefrigerante(): boolean {
    const nuncaConsumiuSuco: boolean = new Boolean(this.frequenciaAlimentar.find(alimento => 
      alimento.descricaoAlimento.toLocaleLowerCase().includes('suco') && (!alimento.frequenciaConsumoAlimento 
        || alimento.frequenciaConsumoAlimento === 'N'))).valueOf();

    const nuncaConsumiuRefrigerante: boolean = new Boolean(this.frequenciaAlimentar.find(alimento => 
      alimento.descricaoAlimento.toLocaleLowerCase().includes('refrigerantes') 
          && (!alimento.frequenciaConsumoAlimento || alimento.frequenciaConsumoAlimento === 'N'))).valueOf();

    return nuncaConsumiuSuco && nuncaConsumiuRefrigerante;
  }

  private verificarSePacienteConsomeAlimento(alimento: FrequenciaAlimentarFORM): boolean {
    const nuncaConsumiuAlimento: string = 'N';
    return alimento.frequenciaConsumoAlimento === nuncaConsumiuAlimento;
  }

  public desabilitarBotaoCadastroQuestionario(): boolean {
    const existeOpcaoNaoMarcada: boolean = new Boolean(this.frequenciaAlimentar.find(alimento => !alimento.frequenciaConsumoAlimento)).valueOf();

    return this.processandoOperacao || existeOpcaoNaoMarcada 
      || (this.pacienteConsomeSucoOuRefrigerante() && !this.formularioQuestionario.consumoTipoBebida)
      || this.validarConsumoAlimento(this.pacienteConsomeLeite(), this.consumoLeite)
      || this.validarConsumoAlimento(this.pacienteConsomeCarneVermelha(), this.consumoCarneVermelha)
      || this.validarConsumoAlimento(this.pacienteConsomeFrango(), this.consumoFrango)
      || this.validarConsumoAlimento(this.pacienteConsomePeixe(), this.consumoPeixe);
  }

  private validarConsumoAlimento(pacienteConsomeAlimento: boolean, modosConsumo: string[]): boolean {
    return pacienteConsomeAlimento && (!modosConsumo || modosConsumo.length === 0);
  }

  public resetarCampos(): void {
    this.abrirDialogCadastro = false;

    this.formularioQuestionario = new QuestionarioFrequenciaAlimentarFORM();
    this.frequenciaAlimentar = [];
    this.consumoLeite = [];
    this.consumoCarneVermelha = [];
    this.consumoFrango = [];
    this.consumoPeixe = [];
  }
}
