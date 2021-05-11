import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyComponent } from './../../shared/toasty/toasty.component';
import { InformacoesPreviasConsultaRetorno } from './shared/model/informacoes-previas-consulta-retorno.model';

@Component({
  selector: 'app-tabela-consultas-retornos',
  templateUrl: './tabela-consultas-retornos.component.html',
  styleUrls: ['./tabela-consultas-retornos.component.css']
})

export class TabelaConsultasRetornosComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  public atendimentos: InformacoesPreviasConsultaRetorno[] = [];

  public colunasTabela: any[];
  public inputPesquisa: string;

  constructor() { }

  ngOnInit(): void {
    this.colunasTabela = [
      { header: 'Data', field: 'dataAtendimento', style: 'col-data-atendimento' },
      { header: 'Nome do Paciente', field: 'nomePaciente', style: 'col-nome-paciente' },
      { header: 'Tipo', field: 'descricaoTipoAtendimento', style: 'col-tipo-atendimento' },
      { header: 'Situação', field: 'situacaoAtendimento', style: 'col-situacao' },
      { header: 'Horário', field: 'horarioAtendimento', style: 'col-horario-atendimento' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];
  }

  public armazenarAtendimentoParaExclusao(atendimento: InformacoesPreviasConsultaRetorno): void {

  }
}
