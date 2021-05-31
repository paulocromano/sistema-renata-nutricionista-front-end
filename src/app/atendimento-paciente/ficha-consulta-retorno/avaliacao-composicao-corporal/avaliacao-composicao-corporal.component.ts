import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AvaliacaoComposicaoCorporalFORM } from '../shared/model/avaliacao-composicao-corporal.form';

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

  @Input() public cadastrarAvaliacaoComposicaoCorporal: boolean = false;
  @Output() public formularioAvaliacaoComposicaoCorporal: EventEmitter<AvaliacaoComposicaoCorporalFORM> = new EventEmitter();

  public formularioCadastro: AvaliacaoComposicaoCorporalFORM = new AvaliacaoComposicaoCorporalFORM();
  public formularioCadastroEstaValido: boolean = false;

  constructor() { }

  ngOnInit(): void { }


  public validarFormulario(event: any): void {
      const validacaoParcial: boolean = this.formularioCadastro && new Boolean(this.formularioCadastro.dobraCutaneaTricipitalMilimetros
        && this.formularioCadastro.dobraCutaneaCoxaMilimetros && this.formularioCadastro.dobraCutaneaPanturrilhaMilimetros
        && this.formularioCadastro.porcentagemGorduraDensidadeCorporal && this.formularioCadastro.resultadoCalculoDensidadeCorporal).valueOf();

        if (this.sexoPaciente === 'Masculino') {
            this.formularioCadastroEstaValido = validacaoParcial && new Boolean(this.formularioCadastro.dobraCutaneaPeitoralHomemMilimetros
                && this.formularioCadastro.dobraCutaneaAbdominalHomemMilimetros).valueOf()
        }
        else if (this.sexoPaciente === 'Feminino') {
            this.formularioCadastroEstaValido = validacaoParcial 
                && new Boolean(this.formularioCadastro.dobraCutaneaSupraIliacaMulherMilimetros).valueOf();
        }

        this.emitirEmissaEventoQuandoFormularioEstiverValido();
  }

  private emitirEmissaEventoQuandoFormularioEstiverValido(): void {
      if (this.formularioCadastroEstaValido) {
          this.formularioAvaliacaoComposicaoCorporal.emit(this.formularioCadastro);
      }
      else {
        this.formularioAvaliacaoComposicaoCorporal.emit(null);
      }
  }
}
