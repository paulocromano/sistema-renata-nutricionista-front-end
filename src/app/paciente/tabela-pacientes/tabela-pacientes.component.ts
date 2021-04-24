import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  public enviarEtniasComponenteCadastroPaciente: boolean = false;

  constructor(private pacienteService: PacienteService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.buscarInformacoesListagemCadastroPaciente();

    this.colunasTabela = [
      { header: 'Nome', field: 'nome', style: 'col-nome' },
      { header: 'Etnia', field: 'etnia', style: 'col-etnia' },
      { header: 'Data de nascimento', field: 'dataNascimento', style: 'col-data-nascimento' },
      { header: 'Telefone', field: 'telefone', style: 'col-telefone' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];
  }

  public buscarInformacoesListagemCadastroPaciente(): void {
    this.processandoOperacao = true;

    this.pacienteService.buscarInformacoesListagemCadastroPaciente()
      .subscribe((informacoesListagemCadastroPaciente: ListagemCadastroPaciente) => {
        this.listagemCadastroPaciente = informacoesListagemCadastroPaciente;
        this.processandoOperacao = false;
        this.enviarEtniasComponenteCadastroPaciente = true;
      },
      (error: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao listar Pacientes!');
      });
  }
}
