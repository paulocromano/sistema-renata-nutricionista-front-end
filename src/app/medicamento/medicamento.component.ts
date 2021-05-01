import { HttpErrorResponse } from '@angular/common/http';
import { ToastyComponent } from './../shared/toasty/toasty.component';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MedicamentoService } from './shared/service/medicamento.service';
import { Medicamento } from './shared/model/medicamento.model';
import { MedicamentoFORM } from './shared/model/medicamento.form';

@Component({
  selector: 'app-medicamento',
  templateUrl: './medicamento.component.html',
  styleUrls: ['./medicamento.component.css']
})

export class MedicamentoComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  public medicamentos: Medicamento[] = [];
  public formularioMedicamento: MedicamentoFORM = new MedicamentoFORM();
  public medicamentoSelecionado: Medicamento = new Medicamento();

  public colunasTabela: any[];
  public inputPesquisa: string;
  public processandoOperacao: boolean = false;
  public abrirDialogCadastroEdicao: boolean = false;
  public operacaoEdicao: boolean = false;
  public abrirDialogExclusao: boolean = false;

  constructor(private medicamentoService: MedicamentoService) { }

  ngOnInit(): void {
    this.colunasTabela = [
      { header: 'Nome', field: 'nome', style: 'col-nome' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];

    this.listarMedicamentos();
  }

  public listarMedicamentos(): void {
    this.processandoOperacao = true;

    this.medicamentoService.listarMedicamentosEmOrdemAlfabetica()
      .subscribe((medicamentos: Medicamento[]) => {
        this.medicamentos = medicamentos;
        this.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao listar medicamentos!');
      });
  }

  public salvarMedicamento(): void {
    if (this.operacaoEdicao) {
      this.alterarMedicamento();
    }
    else {
      this.cadastrarMedicamento();
    }
  }

  public cadastrarMedicamento(): void {
    this.processandoOperacao = true;

    this.medicamentoService.cadastrarMedicamento(this.formularioMedicamento)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.resetarCampos();
        this.listarMedicamentos();
        this.toasty.success('Medicamento cadastrado com sucesso!');
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;

        if (errorResponse.status === 400) {
          this.toasty.error(errorResponse.error.message);
        }
        else {
          this.toasty.error('Erro ao cadastrar medicamento!');
        }
      })
  }

  public alterarMedicamento(): void {
    this.processandoOperacao = true;

    this.medicamentoService.alterarMedicamento(this.medicamentoSelecionado.id, this.formularioMedicamento)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.resetarCampos();
        this.listarMedicamentos();
        this.toasty.success('Medicamento alterado com sucesso!');
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;

        if (errorResponse.status === 400) {
          this.toasty.error(errorResponse.error.message);
        }
        else {
          this.toasty.error('Erro ao alterar medicamento!');
        }
      });
  }

  public excluirMedicamento(): void {
    this.processandoOperacao = true;

    this.medicamentoService.excluirMedicamento(this.medicamentoSelecionado.id) 
      .subscribe(() => {
        this.processandoOperacao = false;
        this.toasty.success('Medicamento excluído com sucesso!');
        this.resetarCampos();
        this.listarMedicamentos();
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;

        if (errorResponse.status === 400) {
          this.toasty.error(errorResponse.error.message);
        }
        else {
          this.toasty.error('Erro ao excluir medicamento!');
        }
      });
  }

  public abrirDialogCadastro(): void {
    this.abrirDialogCadastroEdicao = true;
    this.operacaoEdicao = false;
  }

  public medicamentoNaoEstaValido(): boolean {
    if (this.operacaoEdicao) {
      return !this.formularioMedicamento.nome || this.medicamentoSelecionado.nome === this.formularioMedicamento.nome;
    }
    
    return !this.formularioMedicamento.nome;
  }

  public armazenarMedicamentoParaEdicao(medicamento: Medicamento): void {
    this.formularioMedicamento = Object.assign({}, medicamento);
    this.medicamentoSelecionado = medicamento;
    this.operacaoEdicao = true;
    this.abrirDialogCadastroEdicao = true;
  }

  public armazenarMedicamentoParaExclusao(medicamento: Medicamento): void {
    this.medicamentoSelecionado = medicamento;
    this.abrirDialogExclusao = true;
  }

  public quantidadeLimiteCaracteresCampoNome(): string {
    return this.formularioMedicamento.nome ? this.formularioMedicamento.nome.length + '/100' : '0/100';
  }

  public resetarCampos(): void {
    this.formularioMedicamento = new MedicamentoFORM();
    this.medicamentoSelecionado = new Medicamento();

    this.abrirDialogCadastroEdicao = false;
    this.abrirDialogExclusao = false;
    this.operacaoEdicao = false;
  }
}
