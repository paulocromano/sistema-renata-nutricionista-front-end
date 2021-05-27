import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ParametrosAtendimentoService } from './shared/service/parametros-atendimento.service';
import { ParametrosAtendimento } from './shared/model/parametros-atendimento.model';
import { ToastyComponent } from './../../shared/toasty/toasty.component';

@Component({
  selector: 'app-pagina-parametros-atendimento',
  templateUrl: './pagina-parametros-atendimento.component.html',
  styleUrls: ['./pagina-parametros-atendimento.component.css']
})

export class PaginaParametrosAtendimentoComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  public parametrosAtendimento: ParametrosAtendimento = new ParametrosAtendimento();

  public processandoOperacao: boolean = false;

  constructor(private parametrosAtendimentoService: ParametrosAtendimentoService) { }

  ngOnInit(): void {
    this.buscarParametrosAtendimento();
  }

  private buscarParametrosAtendimento(): void {
    this.processandoOperacao = true;

    this.parametrosAtendimentoService.buscarParametrosAtendimento()
      .subscribe((parametrosAtendimento: ParametrosAtendimento) => {
        this.parametrosAtendimento = parametrosAtendimento;
        console.log(this.parametrosAtendimento)
        this.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao buscar os parâmetros de atendimento!');
      });
  }
}
