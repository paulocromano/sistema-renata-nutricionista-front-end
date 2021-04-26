import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ToastyComponent } from './../../../shared/toasty/toasty.component';
import { HistoricoSocial } from './../shared/model/historico-social.model';
import { InformacoesPreviasHistoricoSocial } from './../shared/model/informacoes-previas-historico-social.model';
import { Paciente } from './../../../paciente/shared/model/paciente.model';

@Component({
  selector: 'app-fieldset-historico-social',
  templateUrl: './fieldset-historico-social.component.html',
  styleUrls: ['./fieldset-historico-social.component.css']
})

export class FieldsetHistoricoSocialComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  @Input() public paciente: Paciente;
  @Input() public previaHistoricoSocial: InformacoesPreviasHistoricoSocial[];
  @Input() public dataProximaAtualizacao: string;

  public previaHistoricoSelecionado: InformacoesPreviasHistoricoSocial = new InformacoesPreviasHistoricoSocial();
  public historicoSocial: HistoricoSocial = new HistoricoSocial();

  public colunasTabelaPreviaHistoricos: any[];
  public colunasTabelaPatologiasPaciente: any[];
  public inputPesquisaPreviaHistoricos: string;
  public inputPesquisaPatologiasPaciente: string;
  public abrirDialogInformacoes: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.colunasTabelaPreviaHistoricos = [
      { header: 'Cadastrado em', field: 'dataHoraCadastroHistoricoSocial', style: 'col-data-hora-cadastro' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];

    this.colunasTabelaPatologiasPaciente = [
      { header: 'Descrição', field: 'patologia', style: 'col-descricao' },
      { header: 'Tempo (anos)', field: 'quantosAnosPossuiPatologia', style: 'col-quantosAnosPossuiPatologia' }
    ];
  }

  public armazenarHistoricoSocialSelecionadoParaDialogInformacoes(previaHistoricoSelecionado: InformacoesPreviasHistoricoSocial): void {
    this.previaHistoricoSelecionado = previaHistoricoSelecionado;

    this.abrirDialogInformacoes = true;
  }

  public limparCamposDialog(): void {
    this.abrirDialogInformacoes = false;
  }
}
