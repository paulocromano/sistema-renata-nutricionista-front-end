import { Component, OnInit } from '@angular/core';

import { GraficoService } from './shared/service/grafico.service';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})

export class GraficoComponent implements OnInit {

  constructor(private graficoService: GraficoService) { }

  ngOnInit(): void {
  }

}
