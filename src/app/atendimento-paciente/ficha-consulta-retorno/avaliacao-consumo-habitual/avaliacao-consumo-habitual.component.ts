import { AvaliacaoConsumoHabitual } from './../../shared/model/avaliacao-consumo-habitual.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avaliacao-consumo-habitual',
  templateUrl: './avaliacao-consumo-habitual.component.html',
  styleUrls: ['./avaliacao-consumo-habitual.component.css']
})

export class AvaliacaoConsumoHabitualComponent implements OnInit {

  @Input() public avaliacaoConsumoHabitual: AvaliacaoConsumoHabitual;
  @Input() public visualizarAvaliacaoConsumoHabitual: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
