import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';

import { ToastyComponent } from './../../shared/toasty/toasty.component';
import { Colaborador } from './../shared/model/colaborador.model';
import { UsuarioService } from './../shared/service/usuario.service';
import { AtualizacaoUsuarioFORM } from './../shared/model/atualizacao-usuario.form';
import { AlteracaoSenhaFORM } from './../shared/model/alteracao-senha.form';

@Component({
  selector: 'app-dados-pessoais-usuario',
  templateUrl: './dados-pessoais-usuario.component.html',
  styleUrls: ['./dados-pessoais-usuario.component.css']
})

export class DadosPessoaisUsuarioComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  @Input() public exibirDialog: boolean = false;
  @Output() public fecharDialog: EventEmitter<boolean> = new EventEmitter();
  @Output() public usuarioAtualizado: EventEmitter<Colaborador> = new EventEmitter();

  public dadosUsuario: Colaborador = new Colaborador();
  public formularioUsuario: AtualizacaoUsuarioFORM = new AtualizacaoUsuarioFORM();
  public formularioAlteracaoSenha: AlteracaoSenhaFORM = new AlteracaoSenhaFORM();
  public indiceAbaSelecionada: number = 0;
  public editarInformacoes: boolean = false;
  public carregandoDadosUsuario: boolean = false;
  public processandoOperacao: boolean = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void { }

  public eventoDialogVisivel(event: any): void {
    this.buscarInformacoesUsuarioLogado();
  }

  public buscarInformacoesUsuarioLogado(): void {
    this.carregandoDadosUsuario = true;

    this.usuarioService.buscarInformacoesUsuario()
      .subscribe((colaborador: Colaborador) => {
        this.dadosUsuario = colaborador;
        this.converterParaFormularioColaborador(colaborador);
        this.carregandoDadosUsuario = false;
        this.usuarioAtualizado.emit(colaborador);
      },
      () => {
        this.carregandoDadosUsuario = false;
        this.toasty.error('Erro ao buscar suas informações!');
      })
  }

  private converterParaFormularioColaborador(colaborador: Colaborador): void {
    this.formularioUsuario.nome = colaborador.nome;
    this.formularioUsuario.email = colaborador.email;
  }

  public eventoIndiceAbaSelecionada(eventoAbaSelecionada: any): void {
    this.indiceAbaSelecionada = eventoAbaSelecionada.index;
  }

  public atualizarUsuarioConformeAbaSelecionada(): void {
    if (this.indiceAbaSelecionada === 0) {
      this.atualizarUsuario();
    }
    else if (this.indiceAbaSelecionada === 1) {
      this.alterarSenha();
    }
  }

  private atualizarUsuario(): void {
    this.processandoOperacao = true;

    this.usuarioService.atualizarUsuario(this.formularioUsuario)
      .subscribe(() => {
        this.toasty.success('Suas informações foram alteradas com sucesso!');
        this.processandoOperacao = false;
        this.resetarCampos();
        this.buscarInformacoesUsuarioLogado();
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;

        if (errorResponse.status === 422) {
          this.toasty.mostrarErroDeValidacao(errorResponse);
        }
        else {
          this.toasty.error('Erro ao atualizar suas informações!');
        }
      });
  }

  private alterarSenha(): void {
    this.processandoOperacao = true;

    this.usuarioService.alterarSenha(this.formularioAlteracaoSenha)
      .subscribe(() => {
        this.toasty.success('Senha alterada com sucesso!');
        this.processandoOperacao = false;
        this.resetarCampos();
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;

        if (errorResponse.status === 422) {
          this.toasty.mostrarErroDeValidacao(errorResponse);
        }
        else {
          this.toasty.error('Erro ao atualizar senha!');
        }
      });
  }

  public desabilitarBotaoConfirmacaoConformeAbaSelecionada(): boolean {
    if (this.indiceAbaSelecionada === 0) {
      return (this.dadosUsuario.nome === this.formularioUsuario.nome && this.dadosUsuario.email === this.formularioUsuario.email)
        || !(this.formularioUsuario.nome && this.formularioUsuario.email);
    }
    else if (this.indiceAbaSelecionada === 1) {
      return !(this.formularioAlteracaoSenha && this.formularioAlteracaoSenha.senha
        && this.formularioAlteracaoSenha.senha.length >= 6 && this.formularioAlteracaoSenha.senha.length <= 20);
    }

    return true;
  }

  public resetarCampos(): void {
    if (this.indiceAbaSelecionada === 0 && this.editarInformacoes) {
      this.converterParaFormularioColaborador(this.dadosUsuario);
      this.editarInformacoes = false;
    }
    else {
      this.exibirDialog = false;
      this.editarInformacoes = false;
      this.fecharDialog.emit(true);
  
      this.dadosUsuario = new Colaborador();
      this.formularioUsuario = new AtualizacaoUsuarioFORM();
      this.formularioAlteracaoSenha = new AlteracaoSenhaFORM();
    }
  }
}
