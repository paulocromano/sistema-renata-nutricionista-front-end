import { InformacoesPreviasHistoricoSocial } from './../shared/model/informacoes-previas-historico-social.model';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ToastyComponent } from './../../../shared/toasty/toasty.component';

@Component({
  selector: 'app-fieldset-historico-social',
  templateUrl: './fieldset-historico-social.component.html',
  styleUrls: ['./fieldset-historico-social.component.css']
})

export class FieldsetHistoricoSocialComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  @Input() public previaHistoricoSocial: InformacoesPreviasHistoricoSocial[];
  @Input() public dataProximaAtualizacao: string;

  public colunasTabela: any[];
  public inputPesquisa: string;
  public abrirDialogInformacoes: boolean = false;
  public historicoSelecionado: InformacoesPreviasHistoricoSocial = new InformacoesPreviasHistoricoSocial();

  constructor() { }

  ngOnInit(): void {
    this.colunasTabela = [
      { header: 'Cadastrado em', field: 'dataHoraCadastroHistoricoSocial', style: 'col-data-hora-cadastro' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];
  }

  public armazenarHistoricoSocialSelecionadoParaDialogInformacoes(historicoSelecionado: InformacoesPreviasHistoricoSocial): void {
    this.historicoSelecionado = historicoSelecionado;
  }
}
