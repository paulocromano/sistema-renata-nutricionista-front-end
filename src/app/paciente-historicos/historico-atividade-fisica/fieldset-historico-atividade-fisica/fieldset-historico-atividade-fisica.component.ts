import { SelectItem } from 'primeng/api';
import { AtividadeFisicaFORM } from './../shared/model/atividade-fisica.form';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { Paciente } from './../../../paciente/shared/model/paciente.model';
import { ToastyComponent } from './../../../shared/toasty/toasty.component';
import { InformacoesHistoricosAtividadeFisica } from '../shared/model/informacoes-historicos-atividade-fisica.model';
import { HistoricoAtividadeFisicaService } from './../shared/service/historico-atividade-fisica.service';
import { HistoricoAtividadeFisica } from './../shared/model/historico-atividade-fisica.model';
import { DadosEnum } from './../../../shared/model/dados-enum.model';

@Component({
  selector: 'app-fieldset-historico-atividade-fisica',
  templateUrl: './fieldset-historico-atividade-fisica.component.html',
  styleUrls: ['./fieldset-historico-atividade-fisica.component.css']
})

export class FieldsetHistoricoAtividadeFisicaComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  @Input() public paciente: Paciente;
  @Input() public informacoesHistoricosAtividadeFisica: InformacoesHistoricosAtividadeFisica;

  @Input() public exibirBotaoCadastrarHistorico: boolean = false;
  @Input() public frequenciaAtividadeFisica: DadosEnum[];

  public historicosAtividadeFisica: HistoricoAtividadeFisica[] = [];
  public historicoSelecionado: HistoricoAtividadeFisica = new HistoricoAtividadeFisica();
  public formularioAtividadeFisica: AtividadeFisicaFORM = new AtividadeFisicaFORM();
  public frequenciaAtividadeFisicaDropdown: SelectItem[] = [];
  public dataProximaAtualizacao: string;
  public historicoEstaDesatualizado: boolean = false;

  public colunasTabela: any[];
  public inputPesquisa: string;
  public abrirDialogInformacoes: boolean = false;
  public abrirDialogCadastro: boolean = false;
  public abrirDialogExclusao: boolean = false;
  public processandoOperacao: boolean = false;
  public processandoExclusao: boolean = false;

  constructor(private historicoAtividadeFisicaService: HistoricoAtividadeFisicaService) { }

  ngOnInit(): void {
    this.historicosAtividadeFisica = this.informacoesHistoricosAtividadeFisica.historicosAtividadesFisicas;
    this.dataProximaAtualizacao = this.informacoesHistoricosAtividadeFisica.dataProximaAtualizacaoHistoricoAtividadeFisica;
    this.historicoEstaDesatualizado = this.informacoesHistoricosAtividadeFisica.historicoEstaDesatualizado;

    this.colunasTabela = [
      { header: 'Cadastrado em', field: 'dataHoraCadastroAtividadeFisica', style: 'col-data-hora-cadastro' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];

    if (this.exibirBotaoCadastrarHistorico) {
      this.prepararDadosParaCadastroDeAtividadeFisica();
    }
  }

  public buscarInformacoesHistoricosAtividadeFisicaDoPaciente(): void {
    this.processandoOperacao = true;

    this.historicoAtividadeFisicaService.buscarInformacoesHistoricosAtividadeFisicaDoPaciente(this.paciente.id)
      .subscribe((informacoesHistorico: InformacoesHistoricosAtividadeFisica) => {
        this.historicosAtividadeFisica = informacoesHistorico.historicosAtividadesFisicas;
        this.dataProximaAtualizacao = informacoesHistorico.dataProximaAtualizacaoHistoricoAtividadeFisica;
        this.historicoEstaDesatualizado = informacoesHistorico.historicoEstaDesatualizado;
        console.log(this.historicoEstaDesatualizado)
        this.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao buscar históricos de atividade física do paciente!');
      })
  }

  public excluirHistoricoAtividadeFisica(): void {
    this.processandoExclusao = true;

    this.historicoAtividadeFisicaService.excluirHistoricoAtividadeFisica(this.historicoSelecionado.id)
      .subscribe(() => {
        this.processandoExclusao = false;
        this.resetarCampos();
        this.toasty.success('Histórico de atividade física excluída com sucesso!');
        this.buscarInformacoesHistoricosAtividadeFisicaDoPaciente();
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoExclusao = false;
        this.toasty.error('Erro ao excluir histórico de atividade física!');
      });
  }

  public cadastrarAtividadeFisica(): void {
    this.processandoOperacao = true;

    this.historicoAtividadeFisicaService.cadastrarAtividadeFisicaDoPaciente(this.paciente.id, this.formularioAtividadeFisica)
      .subscribe(() => {
        this.toasty.success('Atividade física cadastrada com sucesso!');
        this.resetarCampos();
        this.processandoOperacao = false;
        this.buscarInformacoesHistoricosAtividadeFisicaDoPaciente();
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoExclusao = false;
        this.toasty.error('Erro ao cadastrar atividade física!');
      });
  }

  private prepararDadosParaCadastroDeAtividadeFisica(): void {
    if (this.frequenciaAtividadeFisica) {
      this.frequenciaAtividadeFisica.forEach(frequencia => this.frequenciaAtividadeFisicaDropdown.push({ 
        label: frequencia.descricao, value: frequencia.codigo
       }));
    }
  }

  public alteracaoFrequenciaAtividadeFisica(event: any): void {
    if (this.formularioAtividadeFisica.frequenciaAtividadeFisica === 'N') {
      this.formularioAtividadeFisica.atividadePraticada = null;
      this.formularioAtividadeFisica.duracao = null;
    }
  }

  public desabilitarBotaoCadastroAtividadeFisica(): boolean {
    if (this.formularioAtividadeFisica.frequenciaAtividadeFisica) {
      if (this.formularioAtividadeFisica.frequenciaAtividadeFisica === 'N') {
        return this.processandoOperacao;
      }
      else if (this.formularioAtividadeFisica.frequenciaAtividadeFisica !== 'N') {
        return this.processandoOperacao || !(this.formularioAtividadeFisica.atividadePraticada && this.formularioAtividadeFisica.duracao
          && !this.formularioAtividadeFisica.duracao.includes('_'));
      }
    }
    else {
      return true;
    }
  }

  public armazenarHistoricoSelecionadoParaDialogInformacoes(historicoAtividadeFisica: HistoricoAtividadeFisica): void {
    this.historicoSelecionado = historicoAtividadeFisica;
    this.abrirDialogInformacoes = true;
  }

  public armazenarHistoricoSelecionadoParaDialogExclusao(historicoAtividadeFisica: HistoricoAtividadeFisica): void {
    this.historicoSelecionado = historicoAtividadeFisica;
    this.abrirDialogExclusao = true;
  }

  public resetarCampos(): void {
    this.abrirDialogInformacoes = false;
    this.abrirDialogCadastro = false;
    this.abrirDialogExclusao = false;

    this.historicoSelecionado = new HistoricoAtividadeFisica();
    this.formularioAtividadeFisica = new AtividadeFisicaFORM();
  }
}
