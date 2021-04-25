import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { PacienteService } from './../shared/service/paciente.service';
import { ToastyComponent } from './../../shared/toasty/toasty.component';
import { ListagemCadastroPaciente } from './../shared/model/listagem-cadastro-paciente.model';
import { Paciente } from './../shared/model/paciente.model';


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
  public pacienteSelecionado: Paciente = new Paciente();

  public processandoOperacao: boolean = false;
  public enviarEtniasComponenteCadastroPaciente: boolean = false;
  public abrirDialogInformacoesPaciente: boolean = false;
  public abrirDialogExclusaoPaciente: boolean = false;

  constructor(
    private pacienteService: PacienteService,
    private route: Router
    ) { }

  ngOnInit(): void {
    this.buscarInformacoesListagemCadastroPaciente();

    this.colunasTabela = [
      { header: 'Nome', field: 'nome', style: 'col-nome' },
      { header: 'Data do Cadastro', field: 'dataCadastro', style: 'col-data-cadastro' },
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

  public excluirPaciente(): void {
    this.processandoOperacao = true;

    this.pacienteService.excluirPaciente(this.pacienteSelecionado.id)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.abrirDialogExclusaoPaciente = false;
        this.toasty.success('Paciente excluído com sucesso!');
        this.buscarInformacoesListagemCadastroPaciente();
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        
        if (errorResponse.status === 400 || errorResponse.status === 404) {
          this.toasty.error(errorResponse.error.message);
        }
        else {
          this.toasty.error('Erro ao excluir paciente!');
        }
      });
  }

  public redirecionarParaPaginaHistoricosDoPaciente(paciente: Paciente): void {
    this.route.navigate(['paciente/historicos', paciente.id]);
  }

  public atualizarTabelaPacientes(atualizarTabela: boolean): void {
    if (atualizarTabela) {
      this.buscarInformacoesListagemCadastroPaciente();
    }
  }

  public armazenarPacienteSelecionadoParaDialogInformacoes(paciente: Paciente): void {
    this.abrirDialogInformacoesPaciente = true;
    this.pacienteSelecionado = paciente;
  }

  public fecharDialogInformacoesPaciente(): void {
    this.abrirDialogInformacoesPaciente = false;
    this.pacienteSelecionado = new Paciente();
  }

  public armazenarPacienteSelecionadoParaDialogExclusao(paciente: Paciente): void {
    this.abrirDialogExclusaoPaciente = true;
    this.pacienteSelecionado = paciente;
  }

  public fecharDialogExclusaoPaciente(): void {
    this.abrirDialogExclusaoPaciente = false;
    this.pacienteSelecionado = new Paciente();
  }
}
