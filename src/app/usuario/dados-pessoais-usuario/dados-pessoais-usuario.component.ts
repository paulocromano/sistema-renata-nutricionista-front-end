import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';

import { ToastyComponent } from './../../shared/toasty/toasty.component';
import { Colaborador } from './../shared/model/colaborador.model';
import { UsuarioService } from './../shared/service/usuario.service';
import { ColaboradorFORM } from './../shared/model/colaborador.form';

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

  public formularioUsuario: ColaboradorFORM = new ColaboradorFORM();
  public editarInformacoes: boolean = false;
  public processandoOperacao: boolean = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  public atualizarUsuario(): void {
    this.processandoOperacao = true;

    this.usuarioService.atualizarUsuario(null, this.formularioUsuario)
      .subscribe(() => {
        this.toasty.success('Suas informações foram alteradas com sucesso!');
        this.processandoOperacao = false;
        this.resetarCampos();
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

  public resetarCampos(): void {
    this.exibirDialog = false;
    this.fecharDialog.emit(true);

    this.formularioUsuario = new ColaboradorFORM();
  }
}
