import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Suplemento } from './shared/model/suplemento.model';
import { SuplementoFORM } from './shared/model/suplemento.form';
import { ToastyComponent } from './../shared/toasty/toasty.component';
import { SuplementoService } from './shared/service/suplemento.service';

@Component({
  selector: 'app-suplemento',
  templateUrl: './suplemento.component.html',
  styleUrls: ['./suplemento.component.css']
})

export class SuplementoComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  public suplementos: Suplemento[] = [];
  public formularioSuplemento: SuplementoFORM = new SuplementoFORM();
  public suplementoSelecionado: Suplemento = new Suplemento();

  public colunasTabela: any[];
  public inputPesquisa: string;
  public processandoOperacao: boolean = false;
  public abrirDialogCadastroEdicao: boolean = false;
  public operacaoEdicao: boolean = false;
  public abrirDialogExclusao: boolean = false;

  constructor(private suplementoService: SuplementoService) { }

  ngOnInit(): void {
    this.colunasTabela = [
      { header: 'Nome', field: 'nome', style: 'col-nome' },
      { header: 'Dose', field: 'dose', style: 'col-dose' },
      { header: 'Forma de Preparo', field: 'formaPreparo', style: 'col-forma-preparo' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];

    this.listarSuplementos();
  }

  public listarSuplementos(): void {
    this.processandoOperacao = true;

    this.suplementoService.listarSuplementosEmOrdemAlfabetica()
      .subscribe((suplementos: Suplemento[]) => {
        this.suplementos = suplementos;
        this.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao listar suplementos!');
      });
  }

  public salvarSuplemento(): void {
    if (this.operacaoEdicao) {
      this.alterarSuplemento();
    }
    else {
      this.cadastrarSuplemento();
    }
  }

  public cadastrarSuplemento(): void {
    this.processandoOperacao = true;

    this.suplementoService.cadastrarSuplemento(this.formularioSuplemento)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.resetarCampos();
        this.listarSuplementos();
        this.toasty.success('Suplemento cadastrado com sucesso!');
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        
        if (errorResponse.status === 400) {
          this.toasty.error(errorResponse.error.message);
        }
        else {
          this.toasty.error('Erro ao cadastrar suplemento!');
        }
      });
  }

  public alterarSuplemento(): void {
    this.processandoOperacao = true;

    this.suplementoService.alterarSuplemento(this.suplementoSelecionado.id, this.formularioSuplemento)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.resetarCampos();
        this.listarSuplementos();
        this.toasty.success('Suplemento alterado com sucesso!');
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        
        if (errorResponse.status === 400) {
          this.toasty.error(errorResponse.error.message);
        }
        else {
          this.toasty.error('Erro ao alterar suplemento!');
        }
      });
  }

  public excluirSuplemento(): void {
    this.processandoOperacao = true;

    this.suplementoService.excluirSuplemento(this.suplementoSelecionado.id)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.resetarCampos();
        this.listarSuplementos();
        this.toasty.success('Suplemento excluído com sucesso!');
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        
        if (errorResponse.status === 400) {
          this.toasty.error(errorResponse.error.message);
        }
        else {
          this.toasty.error('Erro ao excluir suplemento!');
        }
      });
  }

  public abrirDialogCadastro(): void {
    this.abrirDialogCadastroEdicao = true;
    this.operacaoEdicao = false;
  }

  public suplementoNaoEstaValido(): boolean {
    let camposNaoExistem: boolean = !(this.formularioSuplemento.nome && this.formularioSuplemento.dose 
      && this.formularioSuplemento.formaPreparo);

    if (this.operacaoEdicao) {
      return camposNaoExistem || (this.suplementoSelecionado.nome === this.formularioSuplemento.nome)
        && (this.suplementoSelecionado.dose === this.formularioSuplemento.dose)
        && (this.suplementoSelecionado.formaPreparo === this.formularioSuplemento.formaPreparo);
    }
    
    return camposNaoExistem;
  }

  public armazenarSuplementoParaEdicao(suplemento: Suplemento): void {
    this.formularioSuplemento = Object.assign({}, suplemento);
    this.suplementoSelecionado = suplemento;
    this.operacaoEdicao = true;
    this.abrirDialogCadastroEdicao = true;
  }

  public armazenarSuplementoParaExclusao(suplemento: Suplemento): void {
    this.suplementoSelecionado = suplemento;
    this.abrirDialogExclusao = true;
  }

  public quantidadeLimiteCaracteresCampo(campoFormulario: string, maxLength: number): string {
    return campoFormulario ? campoFormulario.length + `/${maxLength}` : `0/${maxLength}`;
  }

  public resetarCampos(): void {
    this.formularioSuplemento = new SuplementoFORM();
    this.suplementoSelecionado = new Suplemento();

    this.abrirDialogCadastroEdicao = false;
    this.abrirDialogExclusao = false;
    this.operacaoEdicao = false;
  }
}