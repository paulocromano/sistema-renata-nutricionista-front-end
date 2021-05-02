import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Patologia } from './shared/model/patologia.model';
import { PatologiaFORM } from './shared/model/patologia.form';
import { ToastyComponent } from './../shared/toasty/toasty.component';
import { PatologiaService } from './shared/service/patologia.service';

@Component({
  selector: 'app-patologia',
  templateUrl: './patologia.component.html',
  styleUrls: ['./patologia.component.css']
})

export class PatologiaComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  public patologias: Patologia[] = [];
  public formularioPatologia: PatologiaFORM = new PatologiaFORM();
  public patologiaSelecionada: Patologia = new Patologia();

  public colunasTabela: any[];
  public inputPesquisa: string;
  public processandoOperacao: boolean = false;
  public abrirDialogCadastroEdicao: boolean = false;
  public operacaoEdicao: boolean = false;
  public abrirDialogExclusao: boolean = false;

  constructor(private patologiaService: PatologiaService) { }

  ngOnInit(): void {
    this.colunasTabela = [
      { header: 'Descrição', field: 'descricao', style: 'col-descricao' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];

    this.listarPatologias();
  }

  public listarPatologias(): void {
    this.processandoOperacao = true;

    this.patologiaService.listarPatologiasEmOrdemAlfabetica()
      .subscribe((patologias: Patologia[]) => {
        this.patologias = patologias;
        this.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao listar patologias!');
      });
  }

  public salvarPatologia(): void {
    if (this.operacaoEdicao) {
      this.alterarPatologia();
    }
    else {
      this.cadastrarPatologia();
    }
  }

  public cadastrarPatologia(): void {
    this.processandoOperacao = true;

    this.patologiaService.cadastrarPatologia(this.formularioPatologia)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.resetarCampos();
        this.listarPatologias();
        this.toasty.success('Patologia cadastrada com sucesso!');
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        
        if (errorResponse.status === 400) {
          this.toasty.error(errorResponse.error.message);
        }
        else {
          this.toasty.error('Erro ao cadastrar patologia!');
        }
      });
  }

  public alterarPatologia(): void {
    this.processandoOperacao = true;

    this.patologiaService.alterarPatologia(this.patologiaSelecionada.id, this.formularioPatologia)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.resetarCampos();
        this.listarPatologias();
        this.toasty.success('Patologia alterada com sucesso!');
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        
        if (errorResponse.status === 400) {
          this.toasty.error(errorResponse.error.message);
        }
        else {
          this.toasty.error('Erro ao alterar patologia!');
        }
      });
  }

  public excluirPatologia(): void {
    this.processandoOperacao = true;

    this.patologiaService.excluirPatologia(this.patologiaSelecionada.id)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.resetarCampos();
        this.listarPatologias();
        this.toasty.success('Patologia excluída com sucesso!');
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        
        if (errorResponse.status === 400) {
          this.toasty.error(errorResponse.error.message);
        }
        else {
          this.toasty.error('Erro ao excluir patologia!');
        }
      });
  }

  public abrirDialogCadastro(): void {
    this.abrirDialogCadastroEdicao = true;
    this.operacaoEdicao = false;
  }

  public patologiaNaoEstaValida(): boolean {
    if (this.operacaoEdicao) {
      return !this.formularioPatologia.descricao || this.patologiaSelecionada.descricao === this.formularioPatologia.descricao;
    }
    
    return !this.formularioPatologia.descricao;
  }

  public armazenarPatologiaParaEdicao(patologia: Patologia): void {
    this.formularioPatologia = Object.assign({}, patologia);
    this.patologiaSelecionada = patologia;
    this.operacaoEdicao = true;
    this.abrirDialogCadastroEdicao = true;
  }

  public armazenarPatologiaParaExclusao(patologia: Patologia): void {
    this.patologiaSelecionada = patologia;
    this.abrirDialogExclusao = true;
  }

  public quantidadeLimiteCaracteresCampoDescricao(): string {
    return this.formularioPatologia.descricao ? this.formularioPatologia.descricao.length + '/100' : '0/100';
  }

  public resetarCampos(): void {
    this.formularioPatologia = new PatologiaFORM();
    this.patologiaSelecionada = new Patologia();

    this.abrirDialogCadastroEdicao = false;
    this.abrirDialogExclusao = false;
    this.operacaoEdicao = false;
  }
}