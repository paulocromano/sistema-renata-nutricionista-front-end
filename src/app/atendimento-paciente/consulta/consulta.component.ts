import { SelectItem } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { ToastyComponent } from './../../shared/toasty/toasty.component';
import { InformacoesCadastroConsulta } from './shared/model/informacoes-cadastro-consulta.model';
import { ConsultaService } from './shared/service/consulta.service';
import { RegistroDietaFORM } from './../ficha-consulta-retorno/shared/model/registro-dieta.form';
import { AvaliacaoComposicaoCorporalFORM } from './../ficha-consulta-retorno/shared/model/avaliacao-composicao-corporal.form';
import { AvaliacaoConsumoHabitualFORM } from './../ficha-consulta-retorno/shared/model/avaliacao-consumo-habitual.form';
import { AvaliacaoMassaMuscularCorporeaFORM } from '../ficha-consulta-retorno/shared/model/avaliacao-massa-muscular-corporea.form';
import { CondutaNutricionalFORM } from '../ficha-consulta-retorno/shared/model/conduta-nutricional.form';
import { ConsultaFORM } from './shared/model/consulta.form';
import { HistoricosPaciente } from './../../paciente-historicos/informacoes-historicos/shared/model/historicos-paciente.model';
import { PacienteService } from './../../paciente/shared/service/paciente.service';
import { Paciente } from './../../paciente/shared/model/paciente.model';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})

export class ConsultaComponent implements OnInit, OnDestroy {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  private subscription: Subscription;
  private idPaciente: number;
  private idConsulta: number;

  public historicosPaciente: HistoricosPaciente = null;
  public informacoesCadastroConsulta: InformacoesCadastroConsulta = new InformacoesCadastroConsulta();
  public formularioConsulta: ConsultaFORM = new ConsultaFORM();
  public paciente: Paciente = new Paciente();
  public respostaSimNao: SelectItem[] = [];

  public carregandoInformacoesDosHistoricosDoPaciente: boolean = true;
  public carregandoInformacoesParaCadastroConsulta: boolean = true;
  public processandoOperacao: boolean = false;
  public exibirDialogCancelarConsulta: boolean = false;
  public exibirDialogFinalizarConsulta: boolean = false;
  public existeHistoricoDesatualizado: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteService,
    private consultaService: ConsultaService
  ) { }

  ngOnInit(): void {
    this.capturarParametrosDaRota();
    this.buscarHistoricosPaciente();
    this.informacoesParaCadastrarConsulta();
  }

  private capturarParametrosDaRota(): void {
    this.subscription = this.activatedRoute.params.subscribe((params: any) => {
      this.idPaciente = parseInt(params['idPaciente']);
      this.idConsulta = parseInt(params['idConsulta']);
    
      if (!this.idPaciente || !this.idConsulta) {
        this.router.navigate(['/consultas-retornos']);
      }
    });
  }

  private buscarHistoricosPaciente(): void {
    this.carregandoInformacoesDosHistoricosDoPaciente = true;

    this.pacienteService.buscarInformacoesHistoricosPaciente(this.idPaciente)
      .subscribe((informacoesHistoricos: HistoricosPaciente) => {
        this.historicosPaciente = informacoesHistoricos;
        this.verificarSeExisteHistoricoDesatualizado();
        this.carregandoInformacoesDosHistoricosDoPaciente = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.carregandoInformacoesDosHistoricosDoPaciente = false;
        this.toasty.error('Erro ao buscar os históricos do paciente!');
      });
  }

  private verificarSeExisteHistoricoDesatualizado(): void {
    this.existeHistoricoDesatualizado = this.historicosPaciente 
      && (this.historicosPaciente.informacoesPreviasHistoricosAlimentares.historicoEstaDesatualizado
        || this.historicosPaciente.informacoesHistoricosAtividadeFisica.historicoEstaDesatualizado
        || this.historicosPaciente.informacoesPreviasHistoricosPatologiaFamiliaresPorData.historicoEstaDesatualizado
        || this.historicosPaciente.informacoesPreviasQuestionariosFrequenciaAlimentar.historicoEstaDesatualizado
        || this.historicosPaciente.informacoesPreviasHistoricosSociais.historicoEstaDesatualizado);
  }
  

  private informacoesParaCadastrarConsulta(): void {
    this.carregandoInformacoesParaCadastroConsulta = true;

    this.consultaService.informacoesParaCadastrarConsulta(this.idPaciente, this.idConsulta)
      .subscribe((informacoesCadastroConsulta: InformacoesCadastroConsulta) => {
        informacoesCadastroConsulta.respostaSimNao.forEach(resposta => 
          this.respostaSimNao.push({ label: resposta.descricao, value: resposta.codigo }));
        this.informacoesCadastroConsulta = informacoesCadastroConsulta;
        this.paciente = informacoesCadastroConsulta.paciente;
        this.carregandoInformacoesParaCadastroConsulta = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.carregandoInformacoesParaCadastroConsulta = false;
        this.toasty.error('Erro ao buscar as informações para cadastro de consulta!')
      })
  }

  public salvarFormularioRegistroDietaHabitual(formularioRegistroDietaHabitual: RegistroDietaFORM): void {
    this.formularioConsulta.registroDietaHabitual = formularioRegistroDietaHabitual;
  }

  public salvarFormularioAvaliacaoConsumoHabitual(formularioAvaliacaoConsumoHabitual: AvaliacaoConsumoHabitualFORM): void {
    this.formularioConsulta.avaliacaoConsumoHabitual = formularioAvaliacaoConsumoHabitual;
  }

  public salvarFormularioAvaliacaoComposicaoCorporal(formularioAvaliacaoComposicaoCorporal: AvaliacaoComposicaoCorporalFORM): void {
    this.formularioConsulta.avaliacaoComposicaoCorporal = formularioAvaliacaoComposicaoCorporal;
  }

  public salvarFormularioAvaliacaoMassaMuscularCorporea(formularioAvaliacaoMassaMuscularCorporea: AvaliacaoMassaMuscularCorporeaFORM): void {
    this.formularioConsulta.avaliacaoMassaMuscularCorporea = formularioAvaliacaoMassaMuscularCorporea;
  }

  public salvarFormularioCondutaNutricional(formularioCondutaNutricional: CondutaNutricionalFORM): void {
    this.formularioConsulta.condutaNutricional = formularioCondutaNutricional;
  }

  public cancelarConsulta(): void {
    this.processandoOperacao = true;

    this.consultaService.cancelarConsulta(this.idPaciente, this.idConsulta)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.router.navigate(['/consultas-retornos']);
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao cancelar a consulta!');
      });
  }

  public finalizarConsulta(): void {
    this.processandoOperacao = true;

    this.consultaService.finalizarConsulta(this.idPaciente, this.idConsulta, this.formularioConsulta)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.router.navigate(['/consultas-retornos']);
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao finalizar a consulta!');
      });
  }

  public botaoFinalizarConsultaNaoEstaValido(): boolean {
    return this.processandoOperacao || !(this.formularioConsulta && this.formularioConsulta.registroDietaHabitual
      && this.formularioConsulta.avaliacaoConsumoHabitual && this.formularioConsulta.avaliacaoComposicaoCorporal
      && this.formularioConsulta.avaliacaoMassaMuscularCorporea && this.formularioConsulta.condutaNutricional);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.idPaciente = null;
    this.idConsulta = null;
    this.formularioConsulta = null;
    this.historicosPaciente = null;
    this.paciente = null;
  }
}
