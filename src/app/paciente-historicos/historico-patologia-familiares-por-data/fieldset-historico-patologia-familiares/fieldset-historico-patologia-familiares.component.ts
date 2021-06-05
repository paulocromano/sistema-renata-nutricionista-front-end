import { PatologiaFamiliaresFORM } from './../shared/model/patologia-familiares.form';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ToastyComponent } from './../../../shared/toasty/toasty.component';
import { Paciente } from './../../../paciente/shared/model/paciente.model';
import { HistoricoPatologiaFamiliares } from './../shared/model/historico-patologia-familiares.model';
import { HistoricoPatologiaFamiliaresPorData } from './../shared/model/historico-patologia-familiares-por-data.model';
import { HistoricoPatologiaFamiliaresService } from './../shared/service/historico-patologia-familiares.service';
import { PreviaHistoricoPatologiaFamiliaresPorData } from './../shared/model/previa-historico-patologia-familiares-por-data.model';
import { InformacoesPreviasHistoricosFamiliaresPorData } from './../shared/model/informacoes-previas-historicos-familiares-data.model';
import { DadosEnum } from './../../../shared/model/dados-enum.model';
import { PatologiaFamiliaresPorDataFORM } from './../shared/model/patologia-familiares-por-data.form';

@Component({
  selector: 'app-fieldset-historico-patologia-familiares',
  templateUrl: './fieldset-historico-patologia-familiares.component.html',
  styleUrls: ['./fieldset-historico-patologia-familiares.component.css']
})

export class FieldsetHistoricoPatologiaFamiliaresComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  @Input() public paciente: Paciente;
  @Input() public informacoesPreviasHistoricosFamiliaresPorData: InformacoesPreviasHistoricosFamiliaresPorData;
  @Input() public exibirBotaoCadastrarHistorico: boolean = false;
  @Input() public patologias: DadosEnum[];

  public previaHistoricoSelecionado: PreviaHistoricoPatologiaFamiliaresPorData = new PreviaHistoricoPatologiaFamiliaresPorData();
  public previaHistoricosPatologiaFamiliares: PreviaHistoricoPatologiaFamiliaresPorData[] = [];
  public formularioPatologiasDosFamiliaresPorData: PatologiaFamiliaresPorDataFORM = new PatologiaFamiliaresPorDataFORM();
  public formularioPatologiasDosFamiliares: PatologiaFamiliaresFORM[] = [];
  public dataProximaAtualizacao: string;
  public historicoEstaDesatualizado: boolean = false;

  public previaHistoricoPorDataSelecionado: PreviaHistoricoPatologiaFamiliaresPorData = new PreviaHistoricoPatologiaFamiliaresPorData();
  public historicoPatologiaFamiliaresPorData: HistoricoPatologiaFamiliaresPorData = new HistoricoPatologiaFamiliaresPorData();
  public patologiasFamiliares: HistoricoPatologiaFamiliares[] = [];

  public colunasTabelaPreviaHistoricosPatologiaFamiliaresPorData: any[];
  public colunasTabelaHistoricosPatologiaFamiliares: any[];
  public colunasTabelaCadastroPatologiasFamiliares: any[];
  public inputPesquisaPreviaHistoricos: string;
  public abrirDialogInformacoes: boolean = false;
  public abrirDialogCadastro: boolean = false;
  public abrirDialogExclusao: boolean = false;
  public processandoOperacao: boolean = false;
  public processandoExclusao: boolean = false;
  
  constructor(private historicoPatologiaFamiliaresService: HistoricoPatologiaFamiliaresService) { }

  ngOnInit(): void {
    this.previaHistoricosPatologiaFamiliares = this.informacoesPreviasHistoricosFamiliaresPorData.previaHistoricosPatologiaFamiliaresPorData;
    this.dataProximaAtualizacao = this.informacoesPreviasHistoricosFamiliaresPorData.dataProximaAtualizacaoHistoricoPatologiasFamiliares;
    this.historicoEstaDesatualizado = this.informacoesPreviasHistoricosFamiliaresPorData.historicoEstaDesatualizado;

    this.colunasTabelaPreviaHistoricosPatologiaFamiliaresPorData = [
      { header: 'Cadastrado em', field: 'dataHoraCadastroPatologiasFamiliaresPorData', style: 'col-data-hora-cadastro' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];

    this.colunasTabelaHistoricosPatologiaFamiliares = [
      { header: 'Patologia', field: 'descricaoPatologiaFamiliares', style: 'col-descricao-patologia-familiares' },
      { header: 'Pai', field: 'pai', style: 'col-pai' },
      { header: 'Mãe', field: 'mae', style: 'col-mae' },
      { header: 'Avôs', field: 'avosMasculinos', style: 'col-avos-masculinos' },
      { header: 'Avós', field: 'avosFemininos', style: 'col-avos-femininos' },
      { header: 'Tios', field: 'tios', style: 'col-tios' },
      { header: 'Tias', field: 'tias', style: 'col-tias' }
    ];

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

  public buscarInformacoesPreviasHistoricosPatologiasFamiliaresPorDataDoPaciente(): void {
    this.processandoOperacao = true;

    this.historicoPatologiaFamiliaresService.buscarInformacoesPreviasHistoricosPatologiasFamiliaresPorDataDoPaciente(this.paciente.id)
      .subscribe((informacoesPreviasHistoricos: InformacoesPreviasHistoricosFamiliaresPorData) => {
        this.previaHistoricosPatologiaFamiliares = informacoesPreviasHistoricos.previaHistoricosPatologiaFamiliaresPorData;
        this.dataProximaAtualizacao = informacoesPreviasHistoricos.dataProximaAtualizacaoHistoricoPatologiasFamiliares;
        this.historicoEstaDesatualizado = informacoesPreviasHistoricos.historicoEstaDesatualizado;
        this.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao buscar prévia dos históricos de patologia dos familiares!');
      });
  }

  public buscarHistoricoPatologiaFamiliaresPorDataDoPaciente(
    previaHistoricoPatologiaFamiliares: PreviaHistoricoPatologiaFamiliaresPorData): void {
      
    this.processandoOperacao = true;
    previaHistoricoPatologiaFamiliares.processandoOperacao = true;

    this.historicoPatologiaFamiliaresService.buscarHistoricoPatologiaFamiliaresPorDataDoPaciente(this.previaHistoricoPorDataSelecionado.id)
      .subscribe((historico: HistoricoPatologiaFamiliaresPorData) => {
        this.historicoPatologiaFamiliaresPorData = historico;
        this.patologiasFamiliares = historico.patologiasFamiliares;
        this.processandoOperacao = false;
        this.abrirDialogInformacoes = true;
        previaHistoricoPatologiaFamiliares.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        previaHistoricoPatologiaFamiliares.processandoOperacao = false;
        this.toasty.error('Erro ao buscar histórico de patologia dos familiares!');
      });
  }

  public excluirHistoricoPatologiaFamiliaresPorData(): void {
    this.processandoExclusao = true;

    this.historicoPatologiaFamiliaresService.excluirHistoricoPatologiaFamiliaresPorData(this.previaHistoricoPorDataSelecionado.id)
      .subscribe(() => {
        this.processandoExclusao = false;
        this.resetarCampos();
        this.buscarInformacoesPreviasHistoricosPatologiasFamiliaresPorDataDoPaciente();
        this.toasty.success('Histórico de patologia dos familiares excluído com sucesso!');
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoExclusao = false;
        this.toasty.error('Erro ao excluir histórico de patologia dos familiares!');
      });
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
        this.buscarInformacoesPreviasHistoricosPatologiasFamiliaresPorDataDoPaciente();
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao cadastrar patologias dos familiares!');
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

  public armazenarHistoricoSelecionadoParaDialogInformacoes(
    previaHistoricoPatologiaFamiliares: PreviaHistoricoPatologiaFamiliaresPorData): void {

    this.previaHistoricoPorDataSelecionado = previaHistoricoPatologiaFamiliares;
    this.buscarHistoricoPatologiaFamiliaresPorDataDoPaciente(previaHistoricoPatologiaFamiliares);
  }

  public armazenarHistoricoSelecionadoParaDialogExclusao(
    previaHistoricoPatologiaFamiliares: PreviaHistoricoPatologiaFamiliaresPorData): void {

      this.previaHistoricoPorDataSelecionado = previaHistoricoPatologiaFamiliares;
      this.abrirDialogExclusao = true;
  }

  public resetarCampos(): void {
    this.abrirDialogInformacoes = false;
    this.abrirDialogCadastro = false;
    this.abrirDialogExclusao = false;

    this.previaHistoricoPorDataSelecionado = new PreviaHistoricoPatologiaFamiliaresPorData();
    this.historicoPatologiaFamiliaresPorData = new HistoricoPatologiaFamiliaresPorData();
    this.formularioPatologiasDosFamiliaresPorData = new PatologiaFamiliaresPorDataFORM();
    this.formularioPatologiasDosFamiliares = [];
    this.patologiasFamiliares = [];
  }
}
