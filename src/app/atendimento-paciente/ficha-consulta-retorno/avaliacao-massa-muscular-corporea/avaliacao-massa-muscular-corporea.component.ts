import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AvaliacaoMassaMuscularCorporeaFORM } from '../shared/model/avaliacao-massa-muscular-corporea.form';

import { AvaliacaoMassaMuscularCorporea } from '../shared/model/avaliacao-massa-muscular-corporea.model';

@Component({
  selector: 'app-avaliacao-massa-muscular-corporea',
  templateUrl: './avaliacao-massa-muscular-corporea.component.html',
  styleUrls: ['./avaliacao-massa-muscular-corporea.component.css']
})

export class AvaliacaoMassaMuscularCorporeaComponent implements OnInit {

  @Input() public avaliacaoMassaMuscularCorporea: AvaliacaoMassaMuscularCorporea;
  @Input() public visualizarAvaliacaoMassaMuscularCorporea: boolean = false;

  @Input() public cadastrarAvaliacaoMassaMuscularCorporea: boolean = false; 
  @Output() public formularioAvaliacaoMassaMuscularCorporea: EventEmitter<AvaliacaoMassaMuscularCorporeaFORM> = new EventEmitter();

  public formularioCadastro: AvaliacaoMassaMuscularCorporeaFORM = new AvaliacaoMassaMuscularCorporeaFORM();
  public formularioCadastroEstaValido: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  public validarFormulario(event: any): void {
    this.formularioCadastroEstaValido = this.formularioCadastro 
        && new Boolean(this.formularioCadastro.circunferenciaCinturaCentimetros && this.formularioCadastro.circunferenciaBracoCentimentros
            && this.formularioCadastro.circunferenciaCoxaCentimetros && this.formularioCadastro.circunferenciaPanturrilhaCentimetros
            && this.formularioCadastro.circunferenciaPunhoCentrimetros && this.formularioCadastro.massaMuscularKg
            && this.formularioCadastro.massaMuscularPorcentagem && this.formularioCadastro.indiceMassaMuscularKgMetroQuadrado).valueOf();

    this.emitirEmissaEventoQuandoFormularioEstiverValido();
  }

  private emitirEmissaEventoQuandoFormularioEstiverValido(): void {
    if (this.formularioCadastroEstaValido) {
        this.formularioAvaliacaoMassaMuscularCorporea.emit(this.formularioCadastro);
    }
    else {
      this.formularioAvaliacaoMassaMuscularCorporea.emit(null);
    }
}
}
