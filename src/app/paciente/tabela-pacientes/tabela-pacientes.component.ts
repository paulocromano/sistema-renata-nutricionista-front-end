import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { PacienteService } from './../shared/service/paciente.service';
import { Paciente } from './../shared/model/paciente.model';
import { ToastyComponent } from './../../shared/toasty/toasty.component';

@Component({
  selector: 'app-tabela-pacientes',
  templateUrl: './tabela-pacientes.component.html',
  styleUrls: ['./tabela-pacientes.component.css']
})

export class TabelaPacientesComponent implements OnInit {
  
  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  public inputPesquisa: string = '';
  public colunasTabela: any[];
  public pacientes: Paciente[];

  public processandoOperacao: boolean = false;

  constructor(private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.colunasTabela = [
      { header: 'Nome', field: 'nome', style: 'col-nome' },
      { header: 'Etnia', field: 'etnia', style: 'col-etnia' },
      { header: 'Data de nascimento', field: 'data-nascimento', style: 'col-data-nascimento' },
      { header: 'Telefone', field: 'telefone', style: 'col-telefone' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ]
  }

  public buscarPacientesEmOrdemAlfabetica(): void {
    this.processandoOperacao = true;

    this.pacienteService.buscarPacientesEmOrdemAlfabetica()
      .subscribe((pacientes: Paciente[]) => {
        this.pacientes = pacientes;
        this.processandoOperacao = false;
      },
      (error: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao listar Pacientes!');
      });
  }
}
