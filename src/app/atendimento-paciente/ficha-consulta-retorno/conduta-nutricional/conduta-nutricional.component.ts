import { CondutaNutricionalFORM } from './../shared/model/conduta-nutricional.form';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CondutaNutricional } from '../shared/model/conduta-nutricional.model';

@Component({
  selector: 'app-conduta-nutricional',
  templateUrl: './conduta-nutricional.component.html',
  styleUrls: ['./conduta-nutricional.component.css']
})

export class CondutaNutricionalComponent implements OnInit {

  @Input() public condutaNutricional: CondutaNutricional;
  @Input() public visualizarCondutaNutricional: boolean = false;

  @Input() public cadastrarCondutaNutricional: boolean = false;
  @Output() public formularioCondutaNutricional: EventEmitter<CondutaNutricionalFORM> = new EventEmitter();

  public formularioCadastro: CondutaNutricionalFORM = new CondutaNutricionalFORM();
  public formularioCadastroEstaValido: boolean = false;

  constructor() { }

  ngOnInit(): void { }


  public validarFormulario(event: any): void {
    this.formularioCadastroEstaValido = this.formularioCadastro &&
      new Boolean(this.formularioCadastro.prescricaoDietetica && this.formularioCadastro.energiaKcalTotal
        && this.formularioCadastro.carboidratroTotalGramas && this.formularioCadastro.carboidratoGramasKgPeso
        && this.formularioCadastro.carboidratoGramasKgMassaMagra && this.formularioCadastro.proteinaTotalGramas
        && this.formularioCadastro.proteinaAVBGramas && this.formularioCadastro.proteinaAVBGramasKgPeso
        && this.formularioCadastro.lipideoTotal && this.formularioCadastro.lipideoSaturado
        && this.formularioCadastro.lipideoPoiinsaturado && this.formularioCadastro.lipideoMonoinsaturado
        && this.formularioCadastro.relacaoLipideoInsaturadoSaturado).valueOf();

    this.emitirEmissaEventoQuandoFormularioEstiverValido();
  }

  private emitirEmissaEventoQuandoFormularioEstiverValido(): void {
    if (this.formularioCadastroEstaValido) {
        this.formularioCondutaNutricional.emit(this.formularioCadastro);
    }
    else {
      this.formularioCondutaNutricional.emit(null);
    }
}
}
