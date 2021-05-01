import { ToastyComponent } from './../shared/toasty/toasty.component';
import { PatologiaService } from './shared/service/patologia.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Patologia } from './shared/model/patologia.model';
import { PatologiaFORM } from './shared/model/patologia.form';

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
  }

  public resetarCampos(): void {
    this.formularioPatologia = new PatologiaFORM();
    this.patologiaSelecionada = new Patologia();

    this.abrirDialogCadastroEdicao = false;
    this.abrirDialogExclusao = false;
    this.operacaoEdicao = false;
  }
}
