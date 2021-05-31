import { AvaliacaoConsumoHabitualFORM } from './../shared/model/avaliacao-consumo-habitual.form';
import { AvaliacaoConsumoHabitual } from '../shared/model/avaliacao-consumo-habitual.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-avaliacao-consumo-habitual',
  templateUrl: './avaliacao-consumo-habitual.component.html',
  styleUrls: ['./avaliacao-consumo-habitual.component.css']
})

export class AvaliacaoConsumoHabitualComponent implements OnInit {

  @Input() public avaliacaoConsumoHabitual: AvaliacaoConsumoHabitual;
  @Input() public visualizarAvaliacaoConsumoHabitual: boolean = false;

  @Input() public cadastrarAvaliacaoConsumoHabitual: boolean = false;
  @Output() public formularioAvaliacaoConsumoHabitual: EventEmitter<AvaliacaoConsumoHabitualFORM> = new EventEmitter();

  public formularioAvaliacao: AvaliacaoConsumoHabitualFORM = new AvaliacaoConsumoHabitualFORM();
  public formularioCadastroEstaValido: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  public validarFormulario(event: any): void {
    this.formularioCadastroEstaValido = this.formularioAvaliacao 
        && new Boolean(this.formularioAvaliacao.energiaKcal && this.formularioAvaliacao.proteinaTotalGramas
        && this.formularioAvaliacao.proteinaAVBGramas && this.formularioAvaliacao.carboidratoGramas
        && this.formularioAvaliacao.lipideoTotalGramas && this.formularioAvaliacao.lipideoSaturadoGramas
        && this.formularioAvaliacao.lipideoPoliinsaturadoGramas && this.formularioAvaliacao.lipideoMonoinsaturadoGramas
        && this.formularioAvaliacao.colesterolMiligramas && this.formularioAvaliacao.fibraGramas
        && this.formularioAvaliacao.calcioGramas && this.formularioAvaliacao.fosforoGramas
        && this.formularioAvaliacao.ferroMiligramas && this.formularioAvaliacao.zincoMiligramas
        && this.formularioAvaliacao.magnesioMiligramas && this.formularioAvaliacao.potassioMiligramas
        && this.formularioAvaliacao.vitaminaB6Miligramas && this.formularioAvaliacao.vitaminaCMiligramas
        && this.formularioAvaliacao.leucinaMiligramas).valueOf();

        if (this.formularioCadastroEstaValido) {
            this.formularioAvaliacaoConsumoHabitual.emit(this.formularioAvaliacao);
        }
        else {
            this.formularioAvaliacaoConsumoHabitual.emit(null);
        }
    }
}
