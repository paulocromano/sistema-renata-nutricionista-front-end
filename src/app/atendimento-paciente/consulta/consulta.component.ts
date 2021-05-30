import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyComponent } from './../../shared/toasty/toasty.component';
import { InformacoesCadastroConsulta } from './shared/model/informacoes-cadastro-consulta.model';
import { ConsultaService } from './shared/service/consulta.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})

export class ConsultaComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  private subscription: Subscription;
  private idPaciente: number;
  private idConsulta: number;

  public informacoesCadastroConsulta: InformacoesCadastroConsulta = new InformacoesCadastroConsulta();

  public carregandoPagina: boolean = true;
  public processandoOperacao: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private consultaService: ConsultaService
  ) { }

  ngOnInit(): void {
    this.capturarParametrosDaRota();
    this.informacoesParaCadastrarConsulta();
  }

  private capturarParametrosDaRota(): void {
    this.subscription = this.activatedRoute.params.subscribe((params: any) => {
      this.idPaciente = parseInt(params['idPaciente']);
      this.idConsulta = parseInt(params['idConsulta']);
    
      if (!this.idPaciente || !this.idConsulta) {
        this.router.navigate(['/consultas-retornos']);
      }
    });
  }

  private informacoesParaCadastrarConsulta(): void {
    this.consultaService.informacoesParaCadastrarConsulta(this.idPaciente, this.idConsulta)
      .subscribe((informacoesCadastroConsulta: InformacoesCadastroConsulta) => {
        this.informacoesCadastroConsulta = informacoesCadastroConsulta;
        console.log(this.informacoesCadastroConsulta);
        this.carregandoPagina = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.carregandoPagina = false;
        this.toasty.error('Erro ao buscar as informações para cadastro de consulta!')
      })
  }
}
