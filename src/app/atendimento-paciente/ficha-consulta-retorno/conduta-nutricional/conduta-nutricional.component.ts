import { Component, Input, OnInit } from '@angular/core';

import { CondutaNutricional } from '../shared/model/conduta-nutricional.model';

@Component({
  selector: 'app-conduta-nutricional',
  templateUrl: './conduta-nutricional.component.html',
  styleUrls: ['./conduta-nutricional.component.css']
})

export class CondutaNutricionalComponent implements OnInit {

  @Input() public condutaNutricional: CondutaNutricional;
  @Input() public visualizarCondutaNutricional: boolean = false;

  constructor() { }

  ngOnInit(): void { }
}
