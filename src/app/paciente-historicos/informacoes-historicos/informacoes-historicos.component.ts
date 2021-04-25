import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ToastyComponent } from './../../shared/toasty/toasty.component';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe((params: any) => {
      this.idPaciente = parseInt(params['id'])
    
      if (!this.idPaciente) {
        this.router.navigate(['/pacientes']);
      }
    });
  }

  ngOnDestroy(): void {
    this.idPaciente = null;
    this.subscription.unsubscribe();
  }
}
