import { Component, Input, OnInit } from '@angular/core';

import { AvaliacaoComposicaoCorporal } from '../shared/model/avaliacao-composicao-corporal.model';

@Component({
  selector: 'app-avaliacao-composicao-corporal',
  templateUrl: './avaliacao-composicao-corporal.component.html',
  styleUrls: ['./avaliacao-composicao-corporal.component.css']
})

export class AvaliacaoComposicaoCorporalComponent implements OnInit {

  @Input() public avaliacaoComposicaoCorporal: AvaliacaoComposicaoCorporal;
  @Input() public sexoPaciente: string;
  @Input() public visualizarAvaliacaoComposicaoCorporal: boolean = false;

  constructor() { }

  ngOnInit(): void { }

}
