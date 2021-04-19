import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-toasty',
  templateUrl: './toasty.component.html',
  styleUrls: ['./toasty.component.css'],
  providers: [ MessageService ]
})

export class ToastyComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  public error(mensagem: string | HttpErrorResponse): void {
    this.mensagemErro('error', 'Erro', this.verificarSeMensagemVemDoBackEnd(mensagem));
  }

  public success(mensagem: string | HttpErrorResponse): void {
    this.mensagemErro('success', 'Sucesso', this.verificarSeMensagemVemDoBackEnd(mensagem));
  }

  public info(mensagem: string | HttpErrorResponse): void {
    this.mensagemErro('info', 'Informação', this.verificarSeMensagemVemDoBackEnd(mensagem));
  }

  public warning(mensagem: string | HttpErrorResponse): void {
    this.mensagemErro('warn', 'Atenção', this.verificarSeMensagemVemDoBackEnd(mensagem));
  }

  public mensagemErro(tipoErro: string, tituloErro: string, mensagem: string): void {
    this.messageService.add({
      severity: tipoErro, 
      summary: tituloErro, 
      detail: mensagem
    });
  }

  public mostrarErrosDeValidacoes(erro: HttpErrorResponse): void {
    let errosValidacoes = erro.error.errors;
    errosValidacoes.forEach(erroValidacao => this.error(erroValidacao.message));
  }

  private verificarSeMensagemVemDoBackEnd(mensagem: string | HttpErrorResponse): string {
    return (typeof mensagem === 'string') ? mensagem : mensagem.error.message;
  }
}
