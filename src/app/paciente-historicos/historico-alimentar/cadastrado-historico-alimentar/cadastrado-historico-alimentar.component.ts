import { HttpErrorResponse } from '@angular/common/http';
import { HistoricoAlimentarService } from './../shared/service/historico-alimentar.service';
import { SuplementoPacienteFORM } from './../shared/model/suplemento-paciente.form';
import { SelectItem } from 'primeng/api';
import { HistoricoAlimentarFORM } from './../shared/model/historico-alimentar.form';
import { InformacoesCadastroHistoricoAlimentar } from './../../../atendimento-paciente/shared/model/informacoes-cadastro-historico-alimentar.model';
import { Paciente } from './../../../paciente/shared/model/paciente.model';
import { ToastyComponent } from './../../../shared/toasty/toasty.component';
import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cadastrado-historico-alimentar',
  templateUrl: './cadastrado-historico-alimentar.component.html',
  styleUrls: ['./cadastrado-historico-alimentar.component.css']
})

export class CadastradoHistoricoAlimentarComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  @Input() public paciente: Paciente;
  @Input() public exibirBotaoCadastrarHistorico: boolean = false;
  @Input() public informacoesParaCadastro: InformacoesCadastroHistoricoAlimentar;
  @Output() public cadastroHistorico: EventEmitter<boolean> = new EventEmitter();

  public formularioCadastro: HistoricoAlimentarFORM = new HistoricoAlimentarFORM();
  public medicamentosDropdown: SelectItem[] = [];
  public medicamentosSelecionadosDropdown: SelectItem[] = [];
  public nomesMedicamentosSelecionados: string = '';
  public suplementosDropdown: SelectItem[] = [];
  public suplementosSelecionadosDropdown: SelectItem[] = [];
  public formularioSuplementosSelecionados: SuplementoPacienteFORM[] = [];

  public colunasTabelaCadastroSuplementosPaciente: any[];
  public abrirDialogCadastro: boolean = false;
  public abrirDialogSelecaoSuplementosPaciente: boolean = false;
  public processandoOperacao: boolean = false;

  constructor(private historicoAlimentarService: HistoricoAlimentarService) { }

  ngOnInit(): void {
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

  public cadastrarHistoricoAlimentar(): void {
    this.processandoOperacao = true;
    this.formularioCadastro.idMedicamentos = this.medicamentosSelecionadosDropdown.map(medicamento => medicamento.value);
    this.formularioCadastro.suplementosPaciente = this.formularioSuplementosSelecionados;

    this.historicoAlimentarService.cadastrarHistoricoAlimentarDoPaciente(this.paciente.id, this.formularioCadastro)
      .subscribe(() => {
        this.toasty.success('Histórico alimentar cadastrado com sucesso!');
        this.resetarCampos();
        this.processandoOperacao = false;
        this.cadastroHistorico.emit(true);
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao cadastrar histórico alimentar!');
        this.cadastroHistorico.emit(false);
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

  public resetarCampos(): void {
    this.abrirDialogCadastro = false;

    this.formularioCadastro = new HistoricoAlimentarFORM();
    this.medicamentosSelecionadosDropdown = [];
    this.nomesMedicamentosSelecionados = '';
  }
}
