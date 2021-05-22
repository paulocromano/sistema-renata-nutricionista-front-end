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
import { ReagendamentoConsultaFORM } from '../consulta/shared/model/reagendamento-consulta.form';
import { ReagendamentoRetornoFORM } from './../retorno-consulta/shared/model/reagendamento-retorno-consulta.form';

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
  public formularioReagendamentoConsulta: ReagendamentoConsultaFORM = new ReagendamentoConsultaFORM();
  public formularioReagendamentoRetornoConsulta: ReagendamentoRetornoFORM = new ReagendamentoRetornoFORM();
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
  public exibirDialogAgendarReagendarAtendimento: boolean = false;
  public exibirDialogConfirmacaoAtendimento: boolean = false;
  public exibirDialogParaIniciarAtendimento: boolean = false;
  public exibirDialogFichaDaConsulta: boolean = false;
  public exibirDialogFichaDoRetornoConsulta: boolean = false;
  public exibirDialogCancelamentoAtendimento: boolean = false;
  public reagendarAtendimento: boolean = false;
  public formatoCalendario: any;
  public dataMinimaParaAgendamento: Date = new Date();
  public carregandoHorariosParaAgendamento: boolean = false;
  public proximoTipoAtendimentoParaAgendarDoPacienteSelecionado: number = null;
  public mensagemPeriodoDosAtendimentosConsultados: string = '';

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

  public listarHorariosDisponiveisParaAgendamentoReagendamentoConformeData(data: Date): void {
    this.horariosDisponiveisParaAgendamento = [];
    this.horarioSelecionadoParaAgendamento = null;
    this.carregandoHorariosParaAgendamento = true;
    this.dataSelecionadaParaAgendamentoDeAtendimento = this.converterDataParaString(data);
    this.salvarDataNoFormularioDeAgendamentoReagendamentoDeAtendimento(this.dataSelecionadaParaAgendamentoDeAtendimento);
    
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

  private salvarDataNoFormularioDeAgendamentoReagendamentoDeAtendimento(data: string): void {
    if (!this.reagendarAtendimento) {
      if (this.proximoTipoAtendimentoIgualConsulta()) {
        this.formularioAgendamentoConsulta.data = data;
        this.formularioAgendamentoConsulta.horario = null;
      }
      else {
        this.formularioAgendamentoRetornoConsulta.data = data;
        this.formularioAgendamentoRetornoConsulta.horario = null;
      }
    }
    else {
      if (this.tipoAtendimentoIgualConsulta(this.atendimentoSelecionado)) {
        this.formularioReagendamentoConsulta.data = data;
        this.formularioReagendamentoConsulta.horario = null;
      }
      else {
        this.formularioReagendamentoRetornoConsulta.data = data;
        this.formularioReagendamentoRetornoConsulta.horario = null;
      }
    }
  }

  public salvarHorarioNoFormularioDeAgendamentoReagendamentoDeAtendimento(event: any): void {
    if (!this.reagendarAtendimento) {
      if (this.proximoTipoAtendimentoIgualConsulta()) {
        this.formularioAgendamentoConsulta.horario = this.horarioSelecionadoParaAgendamento;
      }
      else {
        this.formularioAgendamentoRetornoConsulta.horario = this.horarioSelecionadoParaAgendamento;
      }
    }
    else {
      if (this.tipoAtendimentoIgualConsulta(this.atendimentoSelecionado)) {
        this.formularioReagendamentoConsulta.horario = this.horarioSelecionadoParaAgendamento;
      }
      else {
        this.formularioReagendamentoRetornoConsulta.horario = this.horarioSelecionadoParaAgendamento;
      }
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

  public agendarReagendarAtendimento(): void {
    if (!this.reagendarAtendimento) {
      if (this.proximoTipoAtendimentoIgualConsulta()) {
        this.agendarConsulta();
      }
      else {
        this.agendarRetornoDaConsulta();
      }
    }
    else {
      if (this.tipoAtendimentoIgualConsulta(this.atendimentoSelecionado)) {
        this.reagendarConsulta();
      }
      else {
        this.reagendarRetornoConsulta();
      }
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

  private reagendarConsulta(): void {
    this.processandoOperacao = true;

    this.consultaService.reagendarConsulta(this.atendimentoSelecionado.idPaciente, this.atendimentoSelecionado.idAtendimento,
      this.formularioReagendamentoConsulta)
      .subscribe(() => {
        this.resetarCampos();
        this.processandoOperacao = false;
        this.toasty.success('Consulta reagendada com sucesso!');
        this.listarAtendimentosPorPeriodoPadrao();
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;

        if(errorResponse.status === 400) {
          this.toasty.error(errorResponse.error.message);
        } 
        else {
          this.toasty.error('Erro ao reagendar a consulta!');
        }
      });
  }

  private reagendarRetornoConsulta(): void {
    this.processandoOperacao = true;

    this.retornoConsultaService.reagendarRetorno(this.atendimentoSelecionado.idPaciente, this.atendimentoSelecionado.idAtendimento,
      this.formularioReagendamentoRetornoConsulta)
      .subscribe(() => {
        this.resetarCampos();
        this.processandoOperacao = false;
        this.toasty.success('Retorno da consulta reagendada com sucesso!');
        this.listarAtendimentosPorPeriodoPadrao();
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;

        if(errorResponse.status === 400) {
          this.toasty.error(errorResponse.error.message);
        } 
        else {
          this.toasty.error('Erro ao reagendar retorno da consulta!');
        }
      });
  }

  public desabilitarBotaoConfirmarAgendamentoReagendamentoAtendimento(): boolean {
    if (!this.reagendarAtendimento) {
      if (this.proximoTipoAtendimentoIgualConsulta()) {
        return this.processandoOperacao || !(this.formularioAgendamentoConsulta && this.formularioAgendamentoConsulta.data 
          && this.formularioAgendamentoConsulta.horario && this.formularioAgendamentoConsulta.motivoConsulta);
      }
      else {
        return this.processandoOperacao || !(this.formularioAgendamentoRetornoConsulta && this.formularioAgendamentoRetornoConsulta.data
          && this.formularioAgendamentoRetornoConsulta.horario);
      }
    }
    else {
      if (this.tipoAtendimentoIgualConsulta(this.atendimentoSelecionado)) {
        return this.processandoOperacao || !(this.formularioReagendamentoConsulta && this.formularioReagendamentoConsulta.data
          && this.formularioReagendamentoConsulta.horario);
      }
      else {
        console.log(this.formularioReagendamentoRetornoConsulta)
        return this.processandoOperacao || !(this.formularioReagendamentoRetornoConsulta 
          && this.formularioReagendamentoRetornoConsulta.data
          && this.formularioReagendamentoRetornoConsulta.horario);
      }
    }
  }

  public listarAtendimentosPorPeriodoPadrao(): void {
    this.processandoOperacao = true;

    this.consultaService.listarAtendimentosPorPeriodoPadrao()
      .subscribe((atendimentos: InformacoesPreviasConsultaRetorno[]) => {
        this.atendimentos = atendimentos;
        this.listarPacientesParaAgendarConsultaOuRetorno();
        this.gerarMensagemDoPeriodoDosAtendimentosConsultados();
        this.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.mensagemPeriodoDosAtendimentosConsultados = '';
        this.toasty.error('Erro ao listar os atendimentos!');
      });
  }

  public listarAtendimentosPorPeriodo(): void {
    this.processandoOperacao = true;

    this.consultaService.listarAtendimentosPorPeriodo(this.dataInicialPesquisaPeriodoAtendimento, this.dataFinalPesquisaPeriodoAtendimento)
      .subscribe((atendimentos: InformacoesPreviasConsultaRetorno[]) => {
        this.atendimentos = atendimentos;
        this.gerarMensagemDoPeriodoDosAtendimentosConsultados();
        this.processandoOperacao = false;
        this.resetarCampos();
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.mensagemPeriodoDosAtendimentosConsultados = '';
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

  private buscarConsultaDoPaciente(): void {
    this.processandoOperacao = true;

    this.consultaService.buscarConsultaDoPaciente(this.atendimentoSelecionado.idAtendimento)
      .subscribe((consulta: Consulta) => {
        this.consultaSelecionada = consulta;
        this.processandoOperacao = false;
        this.exibirDialogFichaDaConsulta = true;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao buscar a consulta do paciente!');
      });
  }

  private buscarRetornoConsultaDoPaciente(): void {
    this.processandoOperacao = true;

    this.retornoConsultaService.buscarRetornoConsultaDoPaciente(this.atendimentoSelecionado.idAtendimento)
      .subscribe((retornoConsulta: RetornoConsulta) => {
        this.retornoConsultaSelecionado = retornoConsulta;
        this.exibirDialogFichaDoRetornoConsulta = true;
        this.processandoOperacao;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao buscar o retorno da consulta do paciente!');
      });
  }

  public armazenarAtendimentoSelecionadoParaDialogInformacoes(atendimento: InformacoesPreviasConsultaRetorno): void {
    this.atendimentoSelecionado = atendimento;
    this.exibirDialogInformacoesAtendimento = true;
  }

  public armazenarAtendimentoParaExibirFicha(atendimento: InformacoesPreviasConsultaRetorno): void {
    this.atendimentoSelecionado = atendimento;

    if (this.tipoAtendimentoIgualConsulta(atendimento)) {
      this.buscarConsultaDoPaciente();
    }
    else {
      this.buscarRetornoConsultaDoPaciente();
    }
  }

  public armazenarAtendimentoParaReagendamento(atendimento: InformacoesPreviasConsultaRetorno): void {
    this.atendimentoSelecionado = atendimento;
    this.reagendarAtendimento = true;
    this.exibirDialogAgendarReagendarAtendimento = true;
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

  private gerarMensagemDoPeriodoDosAtendimentosConsultados(): void {
    if (this.atendimentos && this.atendimentos.length > 0) {
      if (this.atendimentos.length === 1) {
        this.mensagemPeriodoDosAtendimentosConsultados = `Período do atendimento: ${this.atendimentos[0].dataAtendimento}`;
      }
      else {
        if (this.atendimentos[0].dataAtendimento !== this.atendimentos[this.atendimentos.length - 1].dataAtendimento) {
          this.mensagemPeriodoDosAtendimentosConsultados = `Período dos atendimentos: de ${this.atendimentos[0].dataAtendimento}
            à ${this.atendimentos[this.atendimentos.length - 1].dataAtendimento}`;
        }
        else {
          this.mensagemPeriodoDosAtendimentosConsultados = `Período dos atendimentos encontrados: ${this.atendimentos[0].dataAtendimento}`;
        }
      }
    }
    else {
      this.mensagemPeriodoDosAtendimentosConsultados = '';
    }
  }

  public resetarCampos(): void {
    this.exibirDialogInformacoesAtendimento = false;
    this.exibirDialogAgendarReagendarAtendimento = false;
    this.exibirDialogConfirmacaoAtendimento = false;
    this.exibirDialogParaIniciarAtendimento = false;
    this.exibirDialogFichaDaConsulta = false;
    this.exibirDialogFichaDoRetornoConsulta = false;
    this.exibirDialogCancelamentoAtendimento = false;
    this.reagendarAtendimento = false;
    this.carregandoHorariosParaAgendamento = false;

    this.atendimentoSelecionado = new InformacoesPreviasConsultaRetorno();
    this.consultaSelecionada = new Consulta();
    this.retornoConsultaSelecionado = new RetornoConsulta();
    this.pacienteSelecionadoParaAgendamentoAtendimento = new PacienteAgendamentoAtendimento();
    this.dataSelecionadaParaAgendamentoDeAtendimento = null;
    this.horariosDisponiveisParaAgendamento = [];
    this.horarioSelecionadoParaAgendamento = null;
    this.proximoTipoAtendimentoParaAgendarDoPacienteSelecionado = null;
    this.formularioAgendamentoConsulta = new AgendamentoConsultaFORM();
    this.formularioAgendamentoRetornoConsulta = new AgendamentoRetornoFORM();
    this.formularioConfirmacaoConsulta = new ConfirmacaoConsultaFORM();
    this.dataInicialPesquisaPeriodoAtendimento = null;
    this.dataFinalPesquisaPeriodoAtendimento = null;
    this.formularioReagendamentoConsulta = new ReagendamentoConsultaFORM();
    this.formularioReagendamentoRetornoConsulta = new ReagendamentoRetornoFORM();
  }

  ngOnDestroy(): void {
    this.resetarCampos();
  }
}
