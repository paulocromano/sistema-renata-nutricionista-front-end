import { Component, Input, OnInit } from '@angular/core';

import { RefeicoesRegistroDieta } from '../shared/model/refeicoes-registro-dieta.model';

@Component({
  selector: 'app-registro-dieta',
  templateUrl: './registro-dieta.component.html',
  styleUrls: ['./registro-dieta.component.css']
})
export class RegistroDietaComponent implements OnInit {

  @Input() public tipoRegistro: string;
  @Input() public refeicoesRegistroDieta: RefeicoesRegistroDieta[];
  @Input() public visualizarRegistroDieta: boolean = false;

  public colunasTabela: any[];

  constructor() { }

  ngOnInit(): void { 
    this.colunasTabela = [
      { header: 'Refeição', field: 'tipoRefeicao', style: 'col-refeicao' },
      { header: 'Alimento', field: 'alimentos', style: 'col-alimento' },
      { header: 'Quantidade (medida caseira)', field: 'quantidadeMedidaCaseira', style: 'col-quantidade' }
    ];
  }
}
