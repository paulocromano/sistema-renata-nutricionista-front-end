import { CalendarioAtendimentoPacienteFORM } from './shared/model/calendario-atendimento-paciente.form';
import { CalendarioAtendimentoPaciente } from './shared/model/calendario-atendimento-paciente.model';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyComponent } from './../shared/toasty/toasty.component';
import { CalendarioAtendimentoService } from './shared/service/calendario-atendimento.service';

@Component({
  selector: 'app-calendario-atendimento',
  templateUrl: './calendario-atendimento.component.html',
  styleUrls: ['./calendario-atendimento.component.css']
})

export class CalendarioAtendimentoComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  public periodos: CalendarioAtendimentoPaciente[] = [];
  public formularioCalendario: CalendarioAtendimentoPacienteFORM = new CalendarioAtendimentoPacienteFORM();
  public periodoSelecionado: CalendarioAtendimentoPaciente = new CalendarioAtendimentoPaciente();

  public colunasTabela: any[];
  public inputPesquisa: string;
  public processandoOperacao: boolean = false;
  public abrirDialogCadastro: boolean = false;
  public operacaoEdicao: boolean = false;
  public abrirDialogExclusao: boolean = false;

  constructor(private calendarioAtendimentoService: CalendarioAtendimentoService) { }

  ngOnInit(): void {
    this.colunasTabela = [
      { header: 'Data', field: 'data', style: 'col-data' },
      { header: 'Horário', field: 'horario', style: 'col-horario' },
      { header: 'Disponível', field: 'periodoDisponivel', style: 'col-periodo-disponivel' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];
  }

}
