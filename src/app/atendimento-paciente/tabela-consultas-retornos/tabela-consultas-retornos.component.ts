import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyComponent } from './../../shared/toasty/toasty.component';
import { InformacoesPreviasConsultaRetorno } from './shared/model/informacoes-previas-consulta-retorno.model';
import { ConsultaService } from './../consulta/shared/service/consulta.service';

@Component({
  selector: 'app-tabela-consultas-retornos',
  templateUrl: './tabela-consultas-retornos.component.html',
  styleUrls: ['./tabela-consultas-retornos.component.css']
})

export class TabelaConsultasRetornosComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  public atendimentos: InformacoesPreviasConsultaRetorno[] = [];
  public atendimentoSelecionado: InformacoesPreviasConsultaRetorno = new InformacoesPreviasConsultaRetorno();

  public colunasTabela: any[];
  public inputPesquisa: string;
  public dataInicialPesquisaPeriodoAtendimento: string;
  public dataFinalPesquisaPeriodoAtendimento: string;
  public processandoOperacao: boolean = false;
  public exibirDialogInformacoesAtendimento: boolean = false;

  constructor(private consultaService: ConsultaService) { }

  ngOnInit(): void {
    this.colunasTabela = [
      { header: 'Data', field: 'dataAtendimento', style: 'col-data-atendimento' },
      { header: 'Nome do Paciente', field: 'nomePaciente', style: 'col-nome-paciente' },
      { header: 'Tipo', field: 'descricaoTipoAtendimento', style: 'col-tipo-atendimento' },
      { header: 'Situação', field: 'situacaoAtendimento', style: 'col-situacao' },
      { header: 'Horário', field: 'horarioAtendimento', style: 'col-horario-atendimento' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];
    
    this.listarAtendimentosPorPeriodoPadrao();
  }

  public listarAtendimentosPorPeriodoPadrao(): void {
    this.processandoOperacao = true;

    this.consultaService.listarAtendimentosPorPeriodoPadrao()
      .subscribe((atendimentos: InformacoesPreviasConsultaRetorno[]) => {
        this.atendimentos = atendimentos;
        this.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao listar os atendimentos!');
      });
  }

  public listarAtendimentosPorPeriodo(): void {
    this.processandoOperacao = true;

    this.consultaService.listarAtendimentosPorPeriodo(this.dataInicialPesquisaPeriodoAtendimento, this.dataFinalPesquisaPeriodoAtendimento)
      .subscribe((atendimentos: InformacoesPreviasConsultaRetorno[]) => {
        this.atendimentos = atendimentos;
        this.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao listar os atendimentos!');
      });
  }

  public armazenarAtendimentoSelecionadoParaDialogInformacoes(atendimento: InformacoesPreviasConsultaRetorno): void {
    this.atendimentoSelecionado = atendimento;
    this.exibirDialogInformacoesAtendimento = true;
  }

  public armazenarAtendimentoParaCancelamento(atendimento: InformacoesPreviasConsultaRetorno): void {
    this.atendimentoSelecionado = atendimento;
  }

  public desabilitarBotaoPesquisa(): boolean {
    return !(this.dataInicialPesquisaPeriodoAtendimento && !this.dataInicialPesquisaPeriodoAtendimento.includes('_')
      && this.dataFinalPesquisaPeriodoAtendimento && !this.dataFinalPesquisaPeriodoAtendimento.includes('_'));
  }

  public resetarCampos(): void {
    this.exibirDialogInformacoesAtendimento = false;

    this.atendimentoSelecionado = new InformacoesPreviasConsultaRetorno();
  }
}
