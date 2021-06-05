import { Component, Input, OnInit, ViewChild } from '@angular/core';

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
    this.frequenciaConsumoAlimento = this.informacoesCadastro.frequenciaConsumoAlimento;

    this.colunasTabela = [
      { header: 'Descrição Alimento', field: 'descricaoAlimento', style: 'col-descricao-alimento' },
      { header: 'Frequência de Consumo', field: 'frequenciaConsumoAlimento', style: 'col-frequencia-consumo-alimento' }
    ];
  }

  public cadastrarQuestionario(): void {
    this.processandoOperacao = true;
  }

  public abrirDialogQuestionario(): void {
    this.informacoesCadastro.alimentosFrequenciaAlimentar.forEach(alimento => this.frequenciaAlimentar.push({
      descricaoAlimento: alimento.descricao, idAlimentoFrequenciaAlimentar: alimento.id, frequenciaConsumoAlimento: null
    }));

    this.abrirDialogCadastro = true;
  }

  public pacienteConsomeSucoOuRefrigerante(): boolean {
    return new Boolean(this.frequenciaAlimentar.find(alimento => 
      (alimento.descricaoAlimento.toLocaleLowerCase() === 'suco' && alimento.frequenciaConsumoAlimento 
        && alimento.frequenciaConsumoAlimento !== 'N')
    || (alimento.descricaoAlimento.toLocaleLowerCase() === 'refrigerantes' 
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
      alimento.descricaoAlimento.toLocaleLowerCase() === alimentoConsumo.toLocaleLowerCase() 
        && alimento.frequenciaConsumoAlimento && alimento.frequenciaConsumoAlimento !== 'N')).valueOf();
  }

  public desabilitarBotaoCadastroQuestionario(): boolean {
    const existeOpcaoNaoMarcada: boolean = new Boolean(this.frequenciaAlimentar.find(alimento => !alimento.frequenciaConsumoAlimento)).valueOf();

    return existeOpcaoNaoMarcada;
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
