import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';

import { Paciente } from './../../../paciente/shared/model/paciente.model';
import { DadosEnum } from 'src/app/shared/model/dados-enum.model';
import { PatologiaFamiliaresPorDataFORM } from './../shared/model/patologia-familiares-por-data.form';
import { PatologiaFamiliaresFORM } from './../shared/model/patologia-familiares.form';
import { HistoricoPatologiaFamiliaresService } from './../shared/service/historico-patologia-familiares.service';
import { ToastyComponent } from './../../../shared/toasty/toasty.component';

@Component({
  selector: 'app-cadastro-patologia-familiares',
  templateUrl: './cadastro-patologia-familiares.component.html',
  styleUrls: ['./cadastro-patologia-familiares.component.css']
})

export class CadastroPatologiaFamiliaresComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  @Input() public paciente: Paciente;
  @Input() public exibirBotaoCadastrarHistorico: boolean = false;
  @Input() public patologias: DadosEnum[];
  @Output() public cadastroHistorico: EventEmitter<boolean> = new EventEmitter();

  public formularioPatologiasDosFamiliaresPorData: PatologiaFamiliaresPorDataFORM = new PatologiaFamiliaresPorDataFORM();
  public formularioPatologiasDosFamiliares: PatologiaFamiliaresFORM[] = [];

  public colunasTabelaCadastroPatologiasFamiliares: any[];
  public abrirDialogCadastro: boolean = false;
  public processandoOperacao: boolean = false;

  constructor(private historicoPatologiaFamiliaresService: HistoricoPatologiaFamiliaresService) { }

  ngOnInit(): void {
    this.colunasTabelaCadastroPatologiasFamiliares = [
      { header: 'Patologia', field: 'descricao', style: 'col-descricao' },
      { header: 'Pai', field: 'pai', style: 'col-pai' },
      { header: 'Mãe', field: 'mae', style: 'col-mae' },
      { header: 'Avôs', field: 'avosMasculinos', style: 'col-avos-masculinos' },
      { header: 'Avós', field: 'avosFemininos', style: 'col-avos-femininos' },
      { header: 'Tios', field: 'tios', style: 'col-tios' },
      { header: 'Tias', field: 'tias', style: 'col-tias' }
    ];
  }

  public cadastrarPatologiasFamiliares(): void {
    this.processandoOperacao = true;
    this.convertercamposBooleanParaStringFormularioPatologias();

    this.historicoPatologiaFamiliaresService.cadastrarHistoricoPatologiaFamiliaresPorData(this.paciente.id, 
      this.formularioPatologiasDosFamiliaresPorData)
      .subscribe(() => {
        this.toasty.success('Patologias dos familiares cadastrada com sucesso!');
        this.resetarCampos();
        this.processandoOperacao = false;
        this.cadastroHistorico.emit(true);
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao cadastrar patologias dos familiares!');
        this.cadastroHistorico.emit(false);
      });
  }

  private convertercamposBooleanParaStringFormularioPatologias(): void {
    this.formularioPatologiasDosFamiliaresPorData.patologiasFamiliares = [];

    this.formularioPatologiasDosFamiliares.forEach(patologia => {
      const formulario: PatologiaFamiliaresFORM = new PatologiaFamiliaresFORM();

      formulario.patologiaFamiliares = patologia.patologiaFamiliares;
      formulario.pai = this.substituirRespostaFormularioParaString(patologia.pai);
      formulario.mae = this.substituirRespostaFormularioParaString(patologia.mae);
      formulario.avosMasculinos = this.substituirRespostaFormularioParaString(patologia.avosMasculinos);
      formulario.avosFemininos = this.substituirRespostaFormularioParaString(patologia.avosFemininos);
      formulario.tios = this.substituirRespostaFormularioParaString(patologia.tios);
      formulario.tias = this.substituirRespostaFormularioParaString(patologia.tias);

      this.formularioPatologiasDosFamiliaresPorData.patologiasFamiliares.push(formulario);
    });

    console.log(this.formularioPatologiasDosFamiliaresPorData.patologiasFamiliares)
  }

  private substituirRespostaFormularioParaString(campo: string | boolean): string {
    return campo ? 'S' : 'N';
  }

  public abrirDialogCadastroPatologiasFamiliares(): void {
    if (this.patologias) {
      this.patologias.forEach(patologia => this.formularioPatologiasDosFamiliares.push({ 
        descricaoPatologia: patologia.descricao, patologiaFamiliares: patologia.codigo, pai: false, mae: false, 
          avosMasculinos: false, avosFemininos: false, tios: false, tias: false
      }));

      this.abrirDialogCadastro = true;
    }
  }

  public buscarDescricaoPatologiaPeloIndice(patologiaTabela: DadosEnum): number {
    const indicePatologia: number = this.formularioPatologiasDosFamiliares.findIndex(
      patologia => patologia.descricaoPatologia === patologiaTabela.descricao);
    
      if (indicePatologia > -1) {
        return indicePatologia;
      }
      else {
        this.resetarCampos();
      }
  }

  public resetarCampos(): void {
    this.abrirDialogCadastro = false;

    this.formularioPatologiasDosFamiliaresPorData = new PatologiaFamiliaresPorDataFORM();
    this.formularioPatologiasDosFamiliares = [];
  }
}
