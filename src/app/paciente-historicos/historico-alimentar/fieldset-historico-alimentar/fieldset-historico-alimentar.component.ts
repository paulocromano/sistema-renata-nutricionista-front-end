import { HistoricoAlimentar } from './../shared/model/historico-alimentar.model';
import { PreviaHistoricoAlimentar } from './../shared/model/previa-historico-alimentar.model';
import { InformacoesPreviasHistoricosAlimentares } from './../shared/model/informacoes-historicos-alimentares.model';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { HistoricoAlimentarService } from './../shared/service/historico-alimentar.service';
import { Paciente } from './../../../paciente/shared/model/paciente.model';
import { ToastyComponent } from './../../../shared/toasty/toasty.component';

@Component({
  selector: 'app-fieldset-historico-alimentar',
  templateUrl: './fieldset-historico-alimentar.component.html',
  styleUrls: ['./fieldset-historico-alimentar.component.css']
})

export class FieldsetHistoricoAlimentarComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  @Input() public paciente: Paciente;
  @Input() public informacoesPreviasHistoricosAlimentares: InformacoesPreviasHistoricosAlimentares;

  public previaHistoricoSelecionado: PreviaHistoricoAlimentar = new PreviaHistoricoAlimentar();
  public historicoAlimentar: HistoricoAlimentar = new HistoricoAlimentar();
  public previaHistoricosAlimentares: PreviaHistoricoAlimentar[] = [];
  public dataProximaAtualizacao: string;

  public colunasTabelaPreviaHistoricos: any[];
  public colunasTabelaSuplementosPaciente: any[];
  public inputPesquisaPreviaHistoricos: string;
  public inputPesquisaSuplementosPaciente: string;
  public abrirDialogInformacoes: boolean = false;
  public abrirDialogExclusao: boolean = false;
  public processandoOperacao: boolean = false;

  constructor(private historicoAlimentarService: HistoricoAlimentarService) { }

  ngOnInit(): void {
    this.previaHistoricosAlimentares = this.informacoesPreviasHistoricosAlimentares.previaHistoricosAlimentares;
    this.dataProximaAtualizacao = this.informacoesPreviasHistoricosAlimentares.dataProximaAtualizacaoHistoricoAlimentar;
    console.log(this.informacoesPreviasHistoricosAlimentares)

    this.colunasTabelaPreviaHistoricos = [
      { header: 'Cadastrado em', field: 'dataHoraCadastroHistoricoAlimentar', style: 'col-data-hora-cadastro' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];
  }

  public armazenarPreviaHistoricoSelecionadoParaDialogInformacoes(previaHistoricoAlimentar: PreviaHistoricoAlimentar): void {
    this.previaHistoricoSelecionado = previaHistoricoAlimentar;
    this.abrirDialogInformacoes = true;
  }

  public armazenarPreviaHistoricoSelecionadoParaDialogExclusao(previaHistoricoAlimentar: PreviaHistoricoAlimentar): void {
    this.previaHistoricoSelecionado = previaHistoricoAlimentar;
    this.abrirDialogExclusao = true;
  }

  public habilitarSpinnerBotaoInformacoes(previaHistoricoAlimentar: PreviaHistoricoAlimentar): boolean {
    return this.processandoOperacao && this.previaHistoricoSelecionado.id === previaHistoricoAlimentar.id;
  }
}
