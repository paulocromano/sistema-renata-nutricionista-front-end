import { HistoricoPatologiaFamiliaresService } from './../shared/service/historico-patologia-familiares.service';
import { PreviaHistoricoPatologiaFamiliaresPorData } from './../shared/model/previa-historico-patologia-familiares-por-data.model';
import { InformacoesPreviasHistoricosFamiliaresPorData } from './../shared/model/informacoes-previas-historicos-familiares-data.model';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ToastyComponent } from './../../../shared/toasty/toasty.component';
import { Paciente } from './../../../paciente/shared/model/paciente.model';

@Component({
  selector: 'app-fieldset-historico-patologia-familiares',
  templateUrl: './fieldset-historico-patologia-familiares.component.html',
  styleUrls: ['./fieldset-historico-patologia-familiares.component.css']
})

export class FieldsetHistoricoPatologiaFamiliaresComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  @Input() public paciente: Paciente;
  @Input() public informacoesPreviasHistoricosFamiliaresPorData: InformacoesPreviasHistoricosFamiliaresPorData;

  public previaHistoricoSelecionado: PreviaHistoricoPatologiaFamiliaresPorData = new PreviaHistoricoPatologiaFamiliaresPorData();
  public previaHistoricosPatologiaFamiliares: PreviaHistoricoPatologiaFamiliaresPorData[] = [];
  public dataProximaAtualizacao: string;

  public colunasTabelaPreviaHistoricosPatologiaFamiliaresPorData: any[];
  public inputPesquisaPreviaHistoricos: string;
  public abrirDialogInformacoes: boolean = false;
  public abrirDialogExclusao: boolean = false;
  public processandoOperacao: boolean = false;
 
  constructor(private historicoPatologiaFamiliaresService: HistoricoPatologiaFamiliaresService) { }

  ngOnInit(): void {
    this.previaHistoricosPatologiaFamiliares = this.informacoesPreviasHistoricosFamiliaresPorData.previaHistoricosPatologiaFamiliaresPorData;
    this.dataProximaAtualizacao = this.informacoesPreviasHistoricosFamiliaresPorData.dataProximaAtualizacaoHistoricoPatologiasFamiliares;

    this.colunasTabelaPreviaHistoricosPatologiaFamiliaresPorData = [
      { header: 'Cadastrado em', field: 'dataHoraCadastroPatologiasFamiliaresPorData', style: 'col-data-hora-cadastro' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];

    console.log(this.previaHistoricosPatologiaFamiliares)
  }

  public armazenarHistoricoSelecionadoParaDialogInformacoes(
    previaHistoricoPatologiaFamiliares: PreviaHistoricoPatologiaFamiliaresPorData): void {

  }

  public armazenarHistoricoSelecionadoParaDialogExclusao(
    previaHistoricoPatologiaFamiliares: PreviaHistoricoPatologiaFamiliaresPorData): void {

  }

  public habilitarSpinnerBotaoInformacoes(previaHistoricoPatologiaFamiliares: PreviaHistoricoPatologiaFamiliaresPorData): boolean {
    return this.processandoOperacao && this.previaHistoricoSelecionado.id === previaHistoricoPatologiaFamiliares.id;
  }
}
