import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyComponent } from './../shared/toasty/toasty.component';
import { PacienteService } from './shared/service/paciente.service';
import { ViaCEPApiService } from './shared/service/via-cep-api.service';
import { Paciente } from './shared/model/paciente.model';


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})

export class PacienteComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  public inputPesquisa: string = '';
  public colunasTabela: any[];
  public pacientes: Paciente[];
  public processandoOperacao: boolean = false;
  public dialogCadastroEstaVisivel: boolean = false;

  constructor(
    private pacienteService: PacienteService,
    private viaCEPApiService: ViaCEPApiService) { }

  ngOnInit(): void {
    this.colunasTabela = [
      { header: 'Nome', field: 'nome', style: 'col-nome' },
      //{ header: 'Sexo', field: 'sexo', style: 'col-sexo' },
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
