import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { RefeicoesRegistroDieta } from '../shared/model/refeicoes-registro-dieta.model';
import { TipoRefeicao } from './shared/model/tipo-refeicao.enum';
import { RefeicaoRegistroDieta } from './shared/model/refeicao-registro-dieta.model';
import { RegistroDietaFORM } from './../shared/model/registro-dieta.form';

@Component({
  selector: 'app-registro-dieta',
  templateUrl: './registro-dieta.component.html',
  styleUrls: ['./registro-dieta.component.css']
})

export class RegistroDietaComponent implements OnInit {

  @Input() public tipoRegistro: string;

  @Input() public refeicoesRegistroDieta: RefeicoesRegistroDieta[];
  @Input() public visualizarRegistroDieta: boolean = false;

  @Input() public tiposDeRefeicoesParaCadastro: string[];
  @Input() public cadastrarRegistroDieta: boolean = false;
  @Output() public formularioRegistroDieta: EventEmitter<RegistroDietaFORM> = new EventEmitter();

  public colunasTabela: any[];
  public refeicoesParaCadastro: RefeicaoRegistroDieta[] = [];
  public formularioCadastroEstaValido: boolean = false;

  constructor() { }

  ngOnInit(): void { 
    this.colunasTabela = [
      { header: 'Refeição', field: 'tipoRefeicao', style: 'col-refeicao' },
      { header: 'Alimentos', field: 'alimentos', style: 'col-alimento' },
      { header: 'Quantidade (medida caseira)', field: 'quantidadeMedidaCaseira', style: 'col-quantidade' }
    ];

    this.prepararTabelaParaCadastro();
  }

  private prepararTabelaParaCadastro(): void {
      if (this.cadastrarRegistroDieta && this.tiposDeRefeicoesParaCadastro && this.tiposDeRefeicoesParaCadastro.length > 0) {
        this.tiposDeRefeicoesParaCadastro.forEach(tipoRefeicao => 
            this.refeicoesParaCadastro.push({ tipoRefeicao: tipoRefeicao, alimentos: null, quantidadeMedidaCaseira: null,
                camposEstaoValidos: false }));
    }
  }

  public validarCampos(event: any, indiceTipoRefeicao: number): void {
    const refeicao: RefeicaoRegistroDieta = this.refeicoesParaCadastro[indiceTipoRefeicao];
    refeicao.camposEstaoValidos = new Boolean((refeicao.alimentos && refeicao.alimentos && refeicao.quantidadeMedidaCaseira)).valueOf();

    if (refeicao.camposEstaoValidos) {
        const refeicaoInvalida: RefeicaoRegistroDieta = this.refeicoesParaCadastro.find(refeicao => !refeicao.camposEstaoValidos);

        if (refeicaoInvalida) {
            this.formularioCadastroEstaValido = false;
            this.formularioRegistroDieta.emit(null);
        }
        else {
            this.formularioCadastroEstaValido = true;
            this.formularioRegistroDieta.emit(this.gerarFormularioParaEmissaoDeEvento());
        }
    }
    else {
        this.formularioCadastroEstaValido = false;
        this.formularioRegistroDieta.emit(null);
    }
  }


  private gerarFormularioParaEmissaoDeEvento(): RegistroDietaFORM {
    const formulario: RegistroDietaFORM = new RegistroDietaFORM();

    this.refeicoesParaCadastro.forEach(refeicao => {
        switch(refeicao.tipoRefeicao) {
            case TipoRefeicao.DESJEJUM: { 
                formulario.alimentosDesjejum = refeicao.alimentos;
                formulario.quantidadeMedidaCaseiraAlimentosDesjejum = refeicao.quantidadeMedidaCaseira;
                break;
            };
            case TipoRefeicao.LANCHE_MANHA: {
                formulario.alimentosLancheManha = refeicao.alimentos;
                formulario.quantidadeMedidaCaseiraAlimentosLancheManha = refeicao.quantidadeMedidaCaseira;
                break;
            };
            case TipoRefeicao.ALMOCO: {
                formulario.alimentosAlmoco = refeicao.alimentos;
                formulario.quantidadeMedidaCaseiraAlimentosAlmoco = refeicao.quantidadeMedidaCaseira;
                break;
            };
            case TipoRefeicao.LANCHE_TARDE: {
                formulario.alimentosLancheTarde = refeicao.alimentos;
                formulario.quantidadeMedidaCaseiraAlimentosLancheTarde = refeicao.quantidadeMedidaCaseira;
                break;
            };
            case TipoRefeicao.JANTAR: {
                formulario.alimentosJanta = refeicao.alimentos;
                formulario.quantidadeMedidaCaseiraAlimentosJanta = refeicao.quantidadeMedidaCaseira;
                break;
            };
            case TipoRefeicao.CEIA: {
                formulario.alimentosCeia = refeicao.alimentos;
                formulario.quantidadeMedidaCaseiraAlimentosCeia = refeicao.quantidadeMedidaCaseira;
                break;
            };
            case TipoRefeicao.FINAL_SEMANA: {
                formulario.alimentosFinalDeSemana = refeicao.alimentos;
                formulario.quantidadeMedidaCaseiraAlimentosFinalDeSemana = refeicao.quantidadeMedidaCaseira;
                break;
            }
        }
    });
 
    return formulario;
  }

  public quantidadeCaracteres(campo: string): number {
    return campo ? campo.length : 0;
  }
}
