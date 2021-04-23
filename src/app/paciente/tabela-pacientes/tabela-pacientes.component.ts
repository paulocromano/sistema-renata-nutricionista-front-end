import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { PacienteService } from './../shared/service/paciente.service';
import { ToastyComponent } from './../../shared/toasty/toasty.component';
import { ListagemCadastroPaciente } from './../shared/model/listagem-cadastro-paciente.model';

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
  public listagemCadastroPaciente: ListagemCadastroPaciente = new ListagemCadastroPaciente();

  public processandoOperacao: boolean = false;

  constructor(private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.colunasTabela = [
      { header: 'Nome', field: 'nome', style: 'col-nome' },
      { header: 'Etnia', field: 'etnia', style: 'col-etnia' },
      { header: 'Data de nascimento', field: 'data-nascimento', style: 'col-data-nascimento' },
      { header: 'Telefone', field: 'telefone', style: 'col-telefone' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];

    this.buscarInformacoesListagemCadastroPaciente();
  }

  public buscarInformacoesListagemCadastroPaciente(): void {
    this.processandoOperacao = true;

    this.pacienteService.buscarInformacoesListagemCadastroPaciente()
      .subscribe((informacoesListagemCadastroPaciente: ListagemCadastroPaciente) => {
        this.listagemCadastroPaciente = informacoesListagemCadastroPaciente;
        this.processandoOperacao = false;

        console.log(this.listagemCadastroPaciente)
      },
      (error: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao listar Pacientes!');
      });
  }
}
