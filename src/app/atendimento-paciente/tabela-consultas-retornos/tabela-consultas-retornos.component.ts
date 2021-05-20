import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

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
import { ConfirmacaoConsultaFORM } from './../consulta/shared/model/confirmacao-consulta.form';
import { ConfirmacaoAtendimento } from './shared/model/confirmacao-atendimento.model';

@Component({
  selector: 'app-tabela-consultas-retornos',
  templateUrl: './tabela-consultas-retornos.component.html',
  styleUrls: ['./tabela-consultas-retornos.component.css']
})

export class TabelaConsultasRetornosComponent implements OnInit, OnDestroy {

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
  public formularioConfirmacaoConsulta: ConfirmacaoConsultaFORM = new ConfirmacaoConsultaFORM();
  public formasPagamentoConfirmacaoConsulta: SelectItem[] = [];
  public parcelasParaPagarConsulta: SelectItem[] = [];
  public valorConsulta: string = '';

  public colunasTabela: any[];
  public inputPesquisa: string;
  public dataInicialPesquisaPeriodoAtendimento: string;
  public dataFinalPesquisaPeriodoAtendimento: string;
  public processandoOperacao: boolean = false;
  public buscandoPacientesParaAgendamentoDeAtendimento: boolean = false;
  public exibirDialogInformacoesAtendimento: boolean = false;
  public exibirDialogAgendarAtendimento: boolean = false;
  public exibirDialogConfirmacaoAtendimento: boolean = false;
  public exibirDialogParaIniciarAtendimento: boolean = false;
  public exibirDialogCancelamentoAtendimento: boolean = false;
  public formatoCalendario: any;
  public dataMinimaParaAgendamento: Date = new Date();
  public carregandoHorariosParaAgendamento: boolean = false;
  public proximoTipoAtendimentoParaAgendarDoPacienteSelecionado: number = null;

  constructor(
    private consultaService: ConsultaService,
    private retornoConsultaService: RetornoConsultaService,
    private pacienteService: PacienteService,
    private calendarioAtendimentoService: CalendarioAtendimentoService,
    private router: Router) { }

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
    this.buscarInformacoesParaConfirmacaoDeAtendimento();
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
    if (this.proximoTipoAtendimentoIgualConsulta()) {
      this.formularioAgendamentoConsulta.data = data;
    }
    else {
      this.formularioAgendamentoRetornoConsulta.data = data;
    }
  }

  public salvarHorarioNoFormularioDeAgendamentoDeAtendimento(event: any): void {
    if (this.proximoTipoAtendimentoIgualConsulta()) {
      this.formularioAgendamentoConsulta.horario = this.horarioSelecionadoParaAgendamento;
    }
    else {
      this.formularioAgendamentoRetornoConsulta.horario = this.horarioSelecionadoParaAgendamento;
    }
  }

  public listarPacientesParaAgendarConsultaOuRetorno(): void {
    this.buscandoPacientesParaAgendamentoDeAtendimento = true;

    this.pacienteService.buscarPacientesParaAgendarAtendimento()
      .subscribe((pacientes: PacienteAgendamentoAtendimento[]) => {
        this.pacientes = [];
        pacientes.forEach(paciente => this.pacientes.push({ label: paciente.nome, value: paciente.id }));
        this.buscandoPacientesParaAgendamentoDeAtendimento = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.pacientes = [];
        this.buscandoPacientesParaAgendamentoDeAtendimento = false;
        this.toasty.error('Erro ao listar os pacientes para agendamento de consulta ou retorno!');
      });
  }

  private buscarInformacoesParaConfirmacaoDeAtendimento(): void {
    this.consultaService.informacoesParaConfirmacaoDeAtendimento()
      .subscribe((informacoes: ConfirmacaoAtendimento) => {
        informacoes.formasPagamento.forEach(formaPagamento => 
          this.formasPagamentoConfirmacaoConsulta.push({ label: formaPagamento.descricao, value: formaPagamento.codigo }));

        informacoes.quantidadeParcelas.forEach(parcela => this.parcelasParaPagarConsulta.push({ label: parcela.toString(), value: parcela }));
        this.valorConsulta = informacoes.precoConsulta;
      },
      (errorResponse: HttpErrorResponse) => {
        this.buscandoPacientesParaAgendamentoDeAtendimento = false;
        this.toasty.error('Erro ao buscar informações para confirmação de atendimento!');
      });
  }

  public agendarAtendimento(): void {
    if (this.proximoTipoAtendimentoIgualConsulta()) {
      this.agendarConsulta();
    }
    else {
      this.agendarRetornoDaConsulta();
    }

    this.listarPacientesParaAgendarConsultaOuRetorno();
  }

  private agendarConsulta(): void {
    this.processandoOperacao = true;

    this.consultaService.agendarConsulta(this.pacienteSelecionadoParaAgendamentoAtendimento.id, this.formularioAgendamentoConsulta)
      .subscribe(() => {
        this.resetarCampos();
        this.processandoOperacao = false;
        this.toasty.success('Consulta agendada com sucesso!');
        this.listarAtendimentosPorPeriodoPadrao();
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
    if (this.proximoTipoAtendimentoIgualConsulta()) {
      return !(this.formularioAgendamentoConsulta && this.formularioAgendamentoConsulta.data 
        && this.formularioAgendamentoConsulta.horario && this.formularioAgendamentoConsulta.motivoConsulta);
    }
    else {
      return !(this.formularioAgendamentoRetornoConsulta && this.formularioAgendamentoRetornoConsulta.data
        && this.formularioAgendamentoRetornoConsulta.horario);
    }
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

  public confirmarAtendimento(): void {
    if (this.tipoAtendimentoIgualConsulta(this.atendimentoSelecionado)) {
      this.confirmarConsulta();
    }
    else {
      this.confirmarRetornoConsulta();
    }

    this.listarPacientesParaAgendarConsultaOuRetorno();
  }

  private confirmarConsulta(): void {
    this.processandoOperacao = true;
    this.formularioConfirmacaoConsulta.valorConsulta = this.valorConsulta.replace(',', '.');

    this.consultaService.confirmarConsulta(this.atendimentoSelecionado.idPaciente, 
      this.atendimentoSelecionado.idAtendimento, this.formularioConfirmacaoConsulta)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.resetarCampos();
        this.toasty.success('Consulta confirmada com sucesso!');
        this.listarAtendimentosPorPeriodoPadrao();
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao confirmar a consulta!');
      });
  }

  private confirmarRetornoConsulta(): void {
    this.processandoOperacao = true;

    this.retornoConsultaService.confirmarRetornoConsulta(this.atendimentoSelecionado.idPaciente, this.atendimentoSelecionado.idAtendimento)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.resetarCampos();
        this.toasty.success('Retorno da consulta confirmado com sucesso!');
        this.listarAtendimentosPorPeriodoPadrao();
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao confirmar o retorno da consulta!');
      });
  }

  public iniciarAtendimento(): void {
    if (this.atendimentoSelecionado.idPaciente) {
      if (this.tipoAtendimentoIgualConsulta(this.atendimentoSelecionado)) {
        this.iniciarConsulta();
      }
      else {
        this.iniciarRetornoConsulta();
      }
    }
  }

  private iniciarConsulta(): void {
    this.processandoOperacao = true;

    this.consultaService.iniciarConsulta(this.atendimentoSelecionado.idPaciente, this.atendimentoSelecionado.idAtendimento)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.router.navigate(['consulta', this.atendimentoSelecionado.idPaciente, this.atendimentoSelecionado.idAtendimento]);
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao iniciar a consulta!');
      });
  }

  private iniciarRetornoConsulta(): void {
    this.processandoOperacao = true;

    this.retornoConsultaService.iniciarRetornoConsulta(this.atendimentoSelecionado.idPaciente, this.atendimentoSelecionado.idAtendimento)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.router.navigate(['retorno-consulta', this.atendimentoSelecionado.idPaciente, this.atendimentoSelecionado.idAtendimento]);
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao iniciar o retorno da consulta!');
      });
  }

  public cancelarAtendimento(): void {
    if (this.tipoAtendimentoIgualConsulta(this.atendimentoSelecionado)) {
      this.cancelarConsulta();
    }
    else {
      this.cancelarRetornoConsulta();
    }

    this.listarPacientesParaAgendarConsultaOuRetorno();
  }

  private cancelarConsulta(): void {
    this.processandoOperacao = true;
  
    this.consultaService.cancelarConsulta(this.atendimentoSelecionado.idPaciente, this.atendimentoSelecionado.idAtendimento)
      .subscribe(() => {
        this.resetarCampos();
        this.processandoOperacao = false;
        this.toasty.success('Consulta cancelada com sucesso!');
        this.listarAtendimentosPorPeriodoPadrao();
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao cancelar a consulta!');
      });
  }

  private cancelarRetornoConsulta(): void {
    this.processandoOperacao = true;

    this.retornoConsultaService.cancelarRetornoConsulta(this.atendimentoSelecionado.idPaciente, this.atendimentoSelecionado.idAtendimento)
      .subscribe(() => {
        this.resetarCampos();
        this.processandoOperacao = false;
        this.toasty.success('Retorno da consulta cancelada com sucesso!');
        this.listarAtendimentosPorPeriodoPadrao();
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao cancelar o retorno da consulta!');
      });
  }

  public armazenarAtendimentoSelecionadoParaDialogInformacoes(atendimento: InformacoesPreviasConsultaRetorno): void {
    this.atendimentoSelecionado = atendimento;
    this.exibirDialogInformacoesAtendimento = true;
  }

  public armazenarAtendimentoParaConfirmacao(atendimento: InformacoesPreviasConsultaRetorno): void {
    this.atendimentoSelecionado = atendimento;
    this.exibirDialogConfirmacaoAtendimento = true;
  }

  public armazenarAtendimentoParaIniciarConsultaOuRetorno(atendimento: InformacoesPreviasConsultaRetorno): void {
    this.atendimentoSelecionado = atendimento;
    this.exibirDialogParaIniciarAtendimento = true;
  }

  public armazenarAtendimentoParaCancelamento(atendimento: InformacoesPreviasConsultaRetorno): void {
    this.atendimentoSelecionado = atendimento;
    this.exibirDialogCancelamentoAtendimento = true;
  }

  public desabilitarBotaoPesquisa(): boolean {
    return !(this.dataInicialPesquisaPeriodoAtendimento && !this.dataInicialPesquisaPeriodoAtendimento.includes('_')
      && this.dataFinalPesquisaPeriodoAtendimento && !this.dataFinalPesquisaPeriodoAtendimento.includes('_'))
      || this.processandoOperacao;
  }

  public desabilitarBotaoConfirmacaoAtendimento(): boolean {
    if (this.tipoAtendimentoIgualConsulta(this.atendimentoSelecionado)) {
      let botaoDesabilitado: boolean = this.processandoOperacao || !(this.formularioConfirmacaoConsulta.formaPagamento && this.valorConsulta);

      if (this.formularioConfirmacaoConsulta.formaPagamento === '2') {
        return botaoDesabilitado && !this.formularioConfirmacaoConsulta.numeroParcelas;
      }
      else {
        return botaoDesabilitado;
      }
    }
    else {
      return this.processandoOperacao;
    }
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

  private proximoTipoAtendimentoIgualConsulta(): boolean {
    return this.proximoTipoAtendimentoParaAgendarDoPacienteSelecionado === TipoAtendimento.CONSULTA.valueOf();
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
    this.exibirDialogConfirmacaoAtendimento = false;
    this.exibirDialogParaIniciarAtendimento = false;
    this.exibirDialogCancelamentoAtendimento = false;
    this.carregandoHorariosParaAgendamento = false;

    this.atendimentoSelecionado = new InformacoesPreviasConsultaRetorno();
    this.pacienteSelecionadoParaAgendamentoAtendimento = new PacienteAgendamentoAtendimento();
    this.dataSelecionadaParaAgendamentoDeAtendimento = null;
    this.horariosDisponiveisParaAgendamento = [];
    this.horarioSelecionadoParaAgendamento = null;
    this.proximoTipoAtendimentoParaAgendarDoPacienteSelecionado = null;
    this.formularioAgendamentoConsulta = new AgendamentoConsultaFORM();
    this.formularioAgendamentoRetornoConsulta = new AgendamentoRetornoFORM();
    this.formularioConfirmacaoConsulta = new ConfirmacaoConsultaFORM();
  }

  ngOnDestroy(): void {
    this.resetarCampos();
  }
}
