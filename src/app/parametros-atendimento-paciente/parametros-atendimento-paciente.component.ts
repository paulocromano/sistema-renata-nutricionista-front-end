import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ParametrosAtendimentoPacienteFORM } from './shared/model/parametros-atendimento-paciente.form';
import { ParametrosAtendimentoPaciente } from './shared/model/parametros-atendimento-paciente.model';
import { ParametrosAtendimentoPacienteService } from './shared/service/parametros-atendimento-paciente.service';
import { ToastyComponent } from './../shared/toasty/toasty.component';

@Component({
  selector: 'app-parametros-atendimento-paciente',
  templateUrl: './parametros-atendimento-paciente.component.html',
  styleUrls: ['./parametros-atendimento-paciente.component.css']
})

export class ParametrosAtendimentoPacienteComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  public formularioParametrosAtendimento: ParametrosAtendimentoPacienteFORM = new ParametrosAtendimentoPacienteFORM();

  public processandoOperacao: boolean = false;
  public editarParametros: boolean = false;
  public houveAlteracaoNoFormulario: boolean = false;
  public precoConsulta: number;

  constructor(private parametrosAtendimentoPacienteService: ParametrosAtendimentoPacienteService) { }

  ngOnInit(): void {
    this.buscarParametrosAtendimento();
  }

  private buscarParametrosAtendimento(): void {
    this.processandoOperacao = true;

    this.parametrosAtendimentoPacienteService.buscarInformacoesDosParametrosDeAtendimentoDePaciente()
      .subscribe((parametrosAtendimento: ParametrosAtendimentoPaciente) => {
        this.formularioParametrosAtendimento = parametrosAtendimento;
        this.precoConsulta = parseFloat(parametrosAtendimento.precoConsulta);
        this.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao buscar os parâmetros de atendimento!');
      });
  }

  public atualizarParametrosAtendimentoDoPaciente(): void {
    this.processandoOperacao = true;
    this.formularioParametrosAtendimento.precoConsulta = this.precoConsulta.toString().replace(',', '.');

    this.parametrosAtendimentoPacienteService.atualizarParametrosAtendimentoDoPaciente(this.formularioParametrosAtendimento)
      .subscribe(() => {
        this.toasty.success('Parâmetros atualizados com sucesso!');
        this.editarParametros = false;
        this.houveAlteracaoNoFormulario = false;
        this.buscarParametrosAtendimento();
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao atualizar parâmetros!');
      });
  }

  public cancelarAlteracao(): void {
    this.editarParametros = false;

    if (this.houveAlteracaoNoFormulario) {
      this.buscarParametrosAtendimento();
    }

    this.houveAlteracaoNoFormulario = false;
  }

  public verificarSeCampoSofreuAlteracao(event): void {
    console.log('alterado!');
    this.houveAlteracaoNoFormulario = true;
  }

  public desabilitarBotaoConfirmarAlteracao(): boolean {
    return this.processandoOperacao || !this.houveAlteracaoNoFormulario 
      || !(this.formularioParametrosAtendimento && this.precoConsulta 
      && this.formularioParametrosAtendimento.quantidadeParcelas 
      && this.formularioParametrosAtendimento.tempoMesesGeracaoAutomaticaHorariosAtendimento
      && this.formularioParametrosAtendimento.intervaloMinutosEntreAtendimentos
      && this.formularioParametrosAtendimento.intervaloDiasEntrePrimeiraConsultaRetorno
      && this.formularioParametrosAtendimento.intervaloDiasEntreConsultaRetorno
      && this.formularioParametrosAtendimento.intervaloDiasEntreRetornoConsulta
      && this.formularioParametrosAtendimento.tempoMesesAtualizarQuestionarioFrequenciaAlimentar
      && this.formularioParametrosAtendimento.tempoMesesAtualizarHistoricoSocial
      && this.formularioParametrosAtendimento.tempoMesesAtualizarHistoricoPatologiaFamiliares
      && this.formularioParametrosAtendimento.tempoMesesAtualizarHistoricoAtividadeFisica
      && this.formularioParametrosAtendimento.tempoMesesAtualizarHistoricoAlimentar
      && this.formularioParametrosAtendimento.tempoMesesAtualizarHistoricoFrequenciaAlimentar);
  }
}
