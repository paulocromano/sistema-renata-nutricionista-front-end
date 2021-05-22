import { Component, Input, OnInit } from '@angular/core';

import { AvaliacaoMassaMuscularCorporea } from './../../shared/model/avaliacao-massa-muscular-corporea.model';

@Component({
  selector: 'app-avaliacao-massa-muscular-corporea',
  templateUrl: './avaliacao-massa-muscular-corporea.component.html',
  styleUrls: ['./avaliacao-massa-muscular-corporea.component.css']
})

export class AvaliacaoMassaMuscularCorporeaComponent implements OnInit {

  @Input() public avaliacaoMassaMuscularCorporea: AvaliacaoMassaMuscularCorporea;
  @Input() public visualizarAvaliacaoMassaMuscularCorporea: boolean = false;

  constructor() { }

  ngOnInit(): void { }
}
