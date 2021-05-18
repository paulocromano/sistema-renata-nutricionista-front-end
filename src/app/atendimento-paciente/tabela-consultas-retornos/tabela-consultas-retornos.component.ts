import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { SelectItem } from 'primeng/api';

import { ToastyComponent } from './../../shared/toasty/toasty.component';
import { InformacoesPreviasConsultaRetorno } from './shared/model/informacoes-previas-consulta-retorno.model';
import { ConsultaService } from './../consulta/shared/service/consulta.service';
import { TipoAtendimento } from './shared/model/tipo-atendimento.enum';
import { SituacaoConsulta } from './../consulta/shared/model/situacao-consulta.enum';
import { SituacaoRetornoConsulta } from './../retorno-consulta/shared/model/situacao-retorno-consulta.enum';
import { RetornoConsulta } from './../retorno-consulta/shared/model/retorno-consulta.model';
import { Consulta } from './../consulta/shared/model/consulta.model';
import { PacienteService } from './../../paciente/shared/service/paciente.service';
import { PacienteAgendamentoAtendimento } from 'src/app/paciente/shared/model/paciente-agendamento-atendimento.model';
import { CalendarioAtendimentoService } from './../../calendario-atendimento/shared/service/calendario-atendimento.service';
import { PeriodoAtendimento } from './../../calendario-atendimento/shared/model/periodo-atendimento.model';
import { RetornoConsultaService } from './../retorno-consulta/shared/service/retorno-consulta.service';
import { AgendamentoConsultaFORM } from './../consulta/shared/model/agendamento-consulta.form';
import { AgendamentoRetornoFORM } from './../retorno-consulta/shared/model/agendamento-retorno-consulta.form';

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
  public consultaSelecionada: Consulta = new Consulta();
  public retornoConsultaSelecionado: RetornoConsulta = new RetornoConsulta();
  public pacientes: SelectItem[] = [];
  public pacienteSelecionadoParaAgendamentoAtendimento: PacienteAgendamentoAtendimento = new PacienteAgendamentoAtendimento();
  public dataSelecionadaParaAgendamentoDeAtendimento: string;
  public horariosDisponiveisParaAgendamento: SelectItem[] = [];
  public horarioSelecionadoParaAgendamento: string;
  public formularioAgendamentoConsulta: AgendamentoConsultaFORM = new AgendamentoConsultaFORM();
  public formularioAgendamentoRetornoConsulta: AgendamentoRetornoFORM = new AgendamentoRetornoFORM();

  public colunasTabela: any[];
  public inputPesquisa: string;
  public dataInicialPesquisaPeriodoAtendimento: string;
  public dataFinalPesquisaPeriodoAtendimento: string;
  public processandoOperacao: boolean = false;
  public exibirDialogInformacoesAtendimento: boolean = false;
  public exibirDialogAgendarAtendimento: boolean = false;
  public formatoCalendario: any;
  public dataMinimaParaAgendamento: Date = new Date();
  public carregandoHorariosParaAgendamento: boolean = false;
  public proximoTipoAtendimentoParaAgendarDoPacienteSelecionado: number = null;

  constructor(
    private consultaService: ConsultaService,
    private retornoConsultaService: RetornoConsultaService,
    private pacienteService: PacienteService,
    private calendarioAtendimentoService: CalendarioAtendimentoService) { }

  ngOnInit(): void {
    this.colunasTabela = [
      { header: 'Data', field: 'dataAtendimento', style: 'col-data-atendimento' },
      { header: 'Nome do Paciente', field: 'nomePaciente', style: 'col-nome-paciente' },
      { header: 'Tipo', field: 'descricaoTipoAtendimento', style: 'col-tipo-atendimento' },
      { header: 'Situação', field: 'situacaoAtendimento', style: 'col-situacao' },
      { header: 'Horário', field: 'horarioAtendimento', style: 'col-horario-atendimento' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];

    this.formatoCalendario = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      monthNames: [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro'
      ],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: 'mm/dd/yy'
    };

    this.dataMinimaParaAgendamento.setDate(this.dataMinimaParaAgendamento.getDate() + 1);

    this.listarPacientesParaAgendarConsultaOuRetorno();
    this.listarAtendimentosPorPeriodoPadrao();
  }

  public verificarProximoTipoAtendimentoDoPacienteSelecionado(event: any): void {
    if (this.pacienteSelecionadoParaAgendamentoAtendimento) {
      
      this.consultaService.verificarProximoTipoDeAtendimentoDoPaciente(this.pacienteSelecionadoParaAgendamentoAtendimento.id)
        .subscribe((tipoAtendimento: TipoAtendimento) => {
          this.proximoTipoAtendimentoParaAgendarDoPacienteSelecionado = tipoAtendimento.valueOf();
        },
        (errorResponse: HttpErrorResponse) => {
          this.carregandoHorariosParaAgendamento = false;
          this.toasty.error('Erro ao verificar o próximo tipo de atendimento do paciente!');
        });
    }
  }

  public listarHorariosDisponiveisParaAgendamentoConformeData(data: Date): void {
    this.horariosDisponiveisParaAgendamento = [];
    this.horarioSelecionadoParaAgendamento = null;
    this.carregandoHorariosParaAgendamento = true;
    this.dataSelecionadaParaAgendamentoDeAtendimento = this.converterDataParaString(data);
    this.salvarDataNoFormularioDeAgendamentoDeAtendimento(this.dataSelecionadaParaAgendamentoDeAtendimento);
    
    this.calendarioAtendimentoService.buscarHorariosDisponiveisParaDiaDoAgendamentoDeAtendimento(
      this.dataSelecionadaParaAgendamentoDeAtendimento).subscribe((periodos: PeriodoAtendimento[]) => {

        periodos.forEach(periodo => this.horariosDisponiveisParaAgendamento.push({ label: periodo.horario, value: periodo.horario }));
        this.carregandoHorariosParaAgendamento = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.carregandoHorariosParaAgendamento = false;
        this.toasty.error('Erro ao buscar horários disponíveis para agendamento!');
      });
  } 

  private converterDataParaString(data: Date): string {
    let dia: string = (data.getDate() < 10) ? `0${data.getDate()}` : `${data.getDate()}`;
    let mes: string = ((data.getMonth() + 1) < 10) ? `0${data.getMonth() + 1}` : `${data.getMonth() + 1}`;

    return `${dia}/${mes}/${data.getFullYear()}` ;
  }

  private salvarDataNoFormularioDeAgendamentoDeAtendimento(data: string): void {
    if (this.proximoTipoAtendimentoParaAgendarDoPacienteSelecionado === TipoAtendimento.CONSULTA.valueOf()) {
      this.formularioAgendamentoConsulta.data = data;
    }
    else if (this.proximoTipoAtendimentoParaAgendarDoPacienteSelecionado === TipoAtendimento.RETORNO_CONSULTA.valueOf()) {
      this.formularioAgendamentoRetornoConsulta.data = data;
    }
  }

  public salvarHorarioNoFormularioDeAgendamentoDeAtendimento(event: any): void {
    if (this.proximoTipoAtendimentoParaAgendarDoPacienteSelecionado === TipoAtendimento.CONSULTA.valueOf()) {
      this.formularioAgendamentoConsulta.horario = this.horarioSelecionadoParaAgendamento;
    }
    else if (this.proximoTipoAtendimentoParaAgendarDoPacienteSelecionado === TipoAtendimento.RETORNO_CONSULTA.valueOf()) {
      this.formularioAgendamentoRetornoConsulta.horario = this.horarioSelecionadoParaAgendamento;
    }
  }

  public listarPacientesParaAgendarConsultaOuRetorno(): void {
    this.pacienteService.buscarPacientesParaAgendarAtendimento()
      .subscribe((pacientes: PacienteAgendamentoAtendimento[]) => {
        pacientes.forEach(paciente => this.pacientes.push({ label: paciente.nome, value: paciente.id }));
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao listar os pacientes para agendamento de consulta ou retorno!');
      });
  }

  public agendarAtendimento(): void {
    if (this.proximoTipoAtendimentoParaAgendarDoPacienteSelecionado === TipoAtendimento.CONSULTA.valueOf()) {
      this.agendarConsulta();
    }
    else if (this.proximoTipoAtendimentoParaAgendarDoPacienteSelecionado === TipoAtendimento.RETORNO_CONSULTA.valueOf()) {
      this.agendarRetornoDaConsulta();
    }
  }

  private agendarConsulta(): void {
    this.processandoOperacao = true;

    this.consultaService.agendarConsulta(this.pacienteSelecionadoParaAgendamentoAtendimento.id, this.formularioAgendamentoConsulta)
      .subscribe(() => {
        this.resetarCampos();
        this.processandoOperacao = false;
        this.toasty.success('Consulta agendada com sucesso!');
        this.listarAtendimentosPorPeriodoPadrao();
        this.listarPacientesParaAgendarConsultaOuRetorno();
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        
        if(errorResponse.status === 400) {
          this.toasty.error(errorResponse.error.message);
        } 
        else {
          this.toasty.error('Erro ao agendar consulta!');
        }
      });
  }

  private agendarRetornoDaConsulta(): void {
    this.processandoOperacao = true;

    this.retornoConsultaService.agendarRetorno(this.pacienteSelecionadoParaAgendamentoAtendimento.id, this.formularioAgendamentoRetornoConsulta)
      .subscribe(() => {
        this.resetarCampos();
        this.processandoOperacao = false;
        this.toasty.success('Retorno da consulta agendada com sucesso!');
        this.listarAtendimentosPorPeriodoPadrao();
        this.listarPacientesParaAgendarConsultaOuRetorno();
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;

        if(errorResponse.status === 400) {
          this.toasty.error(errorResponse.error.message);
        } 
        else {
          this.toasty.error('Erro ao agendar retorno da consulta!');
        }
      });
  }

  public desabilitarBotaoConfirmarAgendamentoAtendimento(): boolean {
    if (this.proximoTipoAtendimentoParaAgendarDoPacienteSelecionado === TipoAtendimento.CONSULTA.valueOf()) {
      return !(this.formularioAgendamentoConsulta && this.formularioAgendamentoConsulta.data 
        && this.formularioAgendamentoConsulta.horario && this.formularioAgendamentoConsulta.motivoConsulta);
    }
    else if (this.proximoTipoAtendimentoParaAgendarDoPacienteSelecionado === TipoAtendimento.RETORNO_CONSULTA.valueOf()) {
      return !(this.formularioAgendamentoRetornoConsulta && this.formularioAgendamentoRetornoConsulta.data
        && this.formularioAgendamentoRetornoConsulta.horario);
    }

    return true;
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

  public exibirBotaoVisualizarFichaDoAtendimento(atendimento: InformacoesPreviasConsultaRetorno): boolean {
      return this.verificarSituacaoAtendimentoParaExibirBotao(atendimento, SituacaoConsulta.CONSULTA_FINALIZADA,
        SituacaoRetornoConsulta.RETORNO_FINALIZADO);
  }

  public exibirBotaoReagendamentoDoAtendimento(atendimento: InformacoesPreviasConsultaRetorno): boolean {
    return this.verificarSituacaoAtendimentoParaExibirBotao(atendimento, SituacaoConsulta.AGUARDANDO_CONFIRMACAO,
      SituacaoRetornoConsulta.AGUARDANDO_CONFIRMACAO);
  }

  public exibirBotaoConfirmacaoDoAtendimento(atendimento: InformacoesPreviasConsultaRetorno): boolean {
    return this.verificarSituacaoAtendimentoParaExibirBotao(atendimento, SituacaoConsulta.AGUARDANDO_CONFIRMACAO,
      SituacaoRetornoConsulta.AGUARDANDO_CONFIRMACAO);
  }

  public exibirBotaoParaIniciarAtendimento(atendimento: InformacoesPreviasConsultaRetorno): boolean {
    return this.verificarSituacaoAtendimentoParaExibirBotao(atendimento, SituacaoConsulta.AGUARDANDO_ATENDIMENTO,
      SituacaoRetornoConsulta.AGUARDANDO_ATENDIMENTO);
  }

  public exibirBotaoParaCancelarAtendimento(atendimento: InformacoesPreviasConsultaRetorno): boolean {
    let descricaoSituacaoAtendimento: string = this.tipoAtendimentoIgualConsulta(atendimento) 
      ? SituacaoConsulta.CONSULTA_FINALIZADA : SituacaoRetornoConsulta.RETORNO_FINALIZADO;

    return atendimento.situacaoAtendimento !== descricaoSituacaoAtendimento;
  }

  private verificarSituacaoAtendimentoParaExibirBotao(atendimento: InformacoesPreviasConsultaRetorno, 
    situacaoConsulta: SituacaoConsulta, situacaoRetornoConsulta: SituacaoRetornoConsulta): boolean {

    let descricaoSituacaoAtendimento: string = this.tipoAtendimentoIgualConsulta(atendimento) 
      ? situacaoConsulta : situacaoRetornoConsulta;

    return atendimento.situacaoAtendimento === descricaoSituacaoAtendimento;
  }

  private tipoAtendimentoIgualConsulta(atendimento: InformacoesPreviasConsultaRetorno): boolean {
    return atendimento.codigoTipoAtendimento === TipoAtendimento.CONSULTA.valueOf();
  }

  public definirMensagemTooltip(mensagem: string, atendimento: InformacoesPreviasConsultaRetorno): string {
    return mensagem + this.descricaoTipoAtendimento(atendimento);
  }

  private descricaoTipoAtendimento(atendimento: InformacoesPreviasConsultaRetorno): string {
    return (atendimento.codigoTipoAtendimento === TipoAtendimento.CONSULTA.valueOf() ? ' consulta' : ' retorno da consulta');
  }

  public resetarCampos(): void {
    this.exibirDialogInformacoesAtendimento = false;
    this.exibirDialogAgendarAtendimento = false;
    this.carregandoHorariosParaAgendamento = false;

    this.atendimentoSelecionado = new InformacoesPreviasConsultaRetorno();
    this.pacienteSelecionadoParaAgendamentoAtendimento = new PacienteAgendamentoAtendimento();
    this.dataSelecionadaParaAgendamentoDeAtendimento = null;
    this.horariosDisponiveisParaAgendamento = [];
    this.horarioSelecionadoParaAgendamento = null;
    this.proximoTipoAtendimentoParaAgendarDoPacienteSelecionado = null;
    this.formularioAgendamentoConsulta = new AgendamentoConsultaFORM();
    this.formularioAgendamentoRetornoConsulta = new AgendamentoRetornoFORM();
  }
}
