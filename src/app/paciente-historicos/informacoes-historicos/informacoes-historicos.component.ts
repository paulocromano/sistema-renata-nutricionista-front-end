import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ToastyComponent } from './../../shared/toasty/toasty.component';
import { PacienteService } from './../../paciente/shared/service/paciente.service';
import { HistoricosPaciente } from './../informacoes-historicos/shared/model/historicos-paciente.model';
import { Paciente } from './../../paciente/shared/model/paciente.model';

@Component({
  selector: 'app-informacoes-historicos',
  templateUrl: './informacoes-historicos.component.html',
  styleUrls: ['./informacoes-historicos.component.css']
})

export class InformacoesHistoricosComponent implements OnInit, OnDestroy {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  private idPaciente: number;
  private subscription: Subscription;

  public historicosPaciente: HistoricosPaciente = new HistoricosPaciente();
  public paciente: Paciente = new Paciente();
  public processandoOperacao: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteService
    ) { }

  ngOnInit(): void {
    this.capturarParametroDaRota();
    this.buscarHistoricosPaciente();
  }

  private capturarParametroDaRota(): void {
    this.subscription = this.activatedRoute.params.subscribe((params: any) => {
      this.idPaciente = parseInt(params['id'])
    
      if (!this.idPaciente) {
        this.router.navigate(['/pacientes']);
      }
    });
  }

  public buscarHistoricosPaciente(): void {
    this.pacienteService.buscarInformacoesHistoricosPaciente(this.idPaciente)
      .subscribe((informacoesHistoricos: HistoricosPaciente) => {
        this.historicosPaciente = informacoesHistoricos;
        this.paciente = this.historicosPaciente.paciente;
        this.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao buscar os históricos do paciente!');
      });
  }

  ngOnDestroy(): void {
    this.idPaciente = null;
    this.subscription.unsubscribe();
  }
}
