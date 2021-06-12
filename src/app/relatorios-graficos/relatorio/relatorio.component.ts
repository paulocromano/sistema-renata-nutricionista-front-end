import { Component, OnInit } from '@angular/core';

import { RelatorioService } from './shared/service/relatorio.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})

export class RelatorioComponent implements OnInit {

  constructor(private relatorioService: RelatorioService) { }

  ngOnInit(): void {
  }

}
