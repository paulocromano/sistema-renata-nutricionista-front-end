import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';

import { SelectItem } from 'primeng/api';

import { HistoricoSocialService } from './../shared/service/historico-social.service';
import { PatologiaPacienteFORM } from './../shared/model/patologia-paciente.form';
import { HistoricoSocialFORM } from './../shared/model/historico-social.form';
import { InformacoesCadastroHistoricoSocial } from './../../../atendimento-paciente/shared/model/informacoes-cadastro-historico-social.model';
import { Paciente } from './../../../paciente/shared/model/paciente.model';
import { ToastyComponent } from './../../../shared/toasty/toasty.component';

@Component({
  selector: 'app-cadastro-historico-social',
  templateUrl: './cadastro-historico-social.component.html',
  styleUrls: ['./cadastro-historico-social.component.css']
})
export class CadastroHistoricoSocialComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  @Input() public paciente: Paciente;
  @Input() public exibirBotaoCadastrarHistorico: boolean = false;
  @Input() public informacoesParaCadastro: InformacoesCadastroHistoricoSocial;
  @Input() public respostaSimNao: SelectItem[];
  @Output() public cadastroHistorico: EventEmitter<boolean> = new EventEmitter();

  public formularioHistoricoSocial: HistoricoSocialFORM = new HistoricoSocialFORM();
  public patologias: SelectItem[] = [];
  public patologiasSelecionadasDropdown: SelectItem[] = [];
  public formularioPatologiasSelecionadas: PatologiaPacienteFORM[] = [];
  public descricaoPatologiasSelecionadas: string = '';
  public estadoCivil: SelectItem[] = [];
  public consumoBebidasAlcoolicas: SelectItem[] = [];
  public consumoCigarro: SelectItem[] = [];
  public habitoIntestinal: SelectItem[] = [];
  public consistenciaFezes: SelectItem[] = [];
  public frequenciaDiurese: SelectItem[] = [];
  public imagensColoracaoDiurese: SelectItem[] = [];
  public imagensColoracaoDiureseSelecionadas: SelectItem[] = [];

  public colunasTabelaPatologiasPacienteParaCadastrar: any[];
  public abrirDialogCadastro: boolean = false;
  public abrirDialogCadastroColoracaoDiurese: boolean = false;
  public abrirDialogCadastroPatologiasPaciente: boolean = false;
  public processandoOperacao: boolean = false;

  constructor(private historicoSocialService: HistoricoSocialService) { }

  ngOnInit(): void {
    this.colunasTabelaPatologiasPacienteParaCadastrar = [
      { header: 'Descri????o', field: 'descricao', style: 'col-descricao' },
      { header: 'Tempo (anos)', field: 'quantosAnosPossuiPatologia', style: 'col-descricao' },
      { header: 'A????es', field: 'acoes', style: 'col-quantos-anos-possui-patologia' }
    ];

    if (this.exibirBotaoCadastrarHistorico) {
      this.prepararDadosParaCadastroDoHistorico();
    }
  }

  public cadastrarHistoricoSocial(): void {
    this.processandoOperacao = true;
    this.formularioHistoricoSocial.patologiasPaciente = this.formularioPatologiasSelecionadas;

    this.historicoSocialService.cadastrarHistoricoSocialDoPaciente(this.paciente.id, this.formularioHistoricoSocial)
      .subscribe(() => {
        this.resetarCampos();
        this.toasty.success('Hist??rico social cadastrado com sucesso!');
        this.processandoOperacao = false;
        this.cadastroHistorico.emit(true);
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao cadastrar hist??rico social!');
        this.cadastroHistorico.emit(false);
      });
  }

  public descricaoColoracoesDiurese(): string {
    let descricaoColoracoesDiureseSelecionadas: string = '';

    if (this.imagensColoracaoDiureseSelecionadas && this.imagensColoracaoDiureseSelecionadas.length > 0) {
      this.imagensColoracaoDiureseSelecionadas.forEach(coloracao => 
        descricaoColoracoesDiureseSelecionadas += coloracao.label + ', ');

      descricaoColoracoesDiureseSelecionadas = descricaoColoracoesDiureseSelecionadas
        .substring(0, descricaoColoracoesDiureseSelecionadas.length - 2);
    }
    else {
      descricaoColoracoesDiureseSelecionadas = 'Nenhuma colora????o selecionada!';
    }

    return descricaoColoracoesDiureseSelecionadas;
  }

  public cancelarColoracoesDiuresePaciente(): void {
    this.abrirDialogCadastroColoracaoDiurese = false;
    this.imagensColoracaoDiureseSelecionadas = [];
  }

  public fecharDialogCadastroColoracoesDiureseSelecionadas(): void {
    this.abrirDialogCadastroColoracaoDiurese = false;
    this.formularioHistoricoSocial.coloracoesDiurese = [];
    this.formularioHistoricoSocial.coloracoesDiurese = this.imagensColoracaoDiureseSelecionadas.map(imagem => parseInt(imagem.value));
  }

  public alteracaoPatologiasSelecionadasParaCadastro(): void {
    this.formularioPatologiasSelecionadas = [];

    this.patologiasSelecionadasDropdown.forEach(patologia => 
      this.formularioPatologiasSelecionadas.push({
        idPatologia: patologia.value, descricao: patologia.label, quantosAnosPossuiPatologia: null})
    );
  }

  public excluirPatologiaDoPaciente(patologiaPaciente: PatologiaPacienteFORM): void {
    const patologiaSelecionadaDropdown: SelectItem = this.patologiasSelecionadasDropdown.find(patologia => 
      patologia.value === patologiaPaciente.idPatologia);
    const indicePatologiaSelecionadaDropdown: number = this.patologiasSelecionadasDropdown.indexOf(patologiaSelecionadaDropdown);

    const indicePatologiaPacienteSelecionadaParaExcluir: number = this.formularioPatologiasSelecionadas.indexOf(patologiaPaciente);

    if (indicePatologiaSelecionadaDropdown > -1 && indicePatologiaPacienteSelecionadaParaExcluir > -1) {
      this.patologiasSelecionadasDropdown.splice(indicePatologiaSelecionadaDropdown, 1);
      this.formularioPatologiasSelecionadas.splice(indicePatologiaPacienteSelecionadaParaExcluir, 1);
    }
  }

  public cancelarPatologiasPaciente(): void {
    this.abrirDialogCadastroPatologiasPaciente = false;
    this.patologiasSelecionadasDropdown = [];
    this.formularioPatologiasSelecionadas = [];
    this.descricaoPatologiasSelecionadas = '';
  }

  public fecharDialogCadastroPatologiasSelecionadas(): void {
    this.abrirDialogCadastroPatologiasPaciente = false;
    this.descricaoPatologiasSelecionadas = '';
    this.patologiasSelecionadasDropdown.forEach(patologia => this.descricaoPatologiasSelecionadas += patologia.label + ', ');
    
    if (this.descricaoPatologiasSelecionadas && this.descricaoPatologiasSelecionadas.includes(', ')) {
      this.descricaoPatologiasSelecionadas = this.descricaoPatologiasSelecionadas.substring(
        0, this.descricaoPatologiasSelecionadas.length - 2);
    }
  }

  public desabilitarBotaoConfirmarPatologiasPacienteSelecionadas(): boolean {
    return new Boolean(this.formularioPatologiasSelecionadas.find(patologia => !patologia.quantosAnosPossuiPatologia)
      || this.formularioPatologiasSelecionadas?.length === 0).valueOf();
  }

  public alteracaoConsumoCigarro(event: any): void {
    if (this.formularioHistoricoSocial.consumoCigarro) {
      this.formularioHistoricoSocial.quantidadeCigarrosPorDia = null;
    }
  }

  public desabilitarBotaoCadastroHistorico(): boolean {
    let desabilitarBotao: boolean = this.processandoOperacao || !(this.formularioHistoricoSocial
      && this.formularioHistoricoSocial.profissao && this.formularioHistoricoSocial.estadoCivil
      && this.formularioHistoricoSocial.composicaoFamiliar && this.formularioHistoricoSocial.localRefeicoes
      && this.formularioHistoricoSocial.frequenciaConsumoBebidasAlcoolicas && this.formularioHistoricoSocial.consumoCigarro
      && this.formularioHistoricoSocial.habitoIntestinal && this.formularioHistoricoSocial.consistenciaFezes
      && this.formularioHistoricoSocial.frequenciaDiurese && this.formularioHistoricoSocial.coloracoesDiurese
      && this.formularioHistoricoSocial.coloracoesDiurese.length > 0 && this.formularioHistoricoSocial.horasSono);

    if (this.formularioHistoricoSocial.consumoCigarro) {
      if (this.formularioHistoricoSocial.consumoCigarro !== '2' && (!this.formularioHistoricoSocial.quantidadeCigarrosPorDia 
        || this.formularioHistoricoSocial.quantidadeCigarrosPorDia === 0)) {
        return true;
      }
    }
    else {
      return true;
    }

    if (this.paciente.sexo === 'Feminino') {
      if (this.formularioHistoricoSocial.menstruacaoNormal) {
        if (this.formularioHistoricoSocial.menstruacaoNormal === 'N') {
          return desabilitarBotao || !this.formularioHistoricoSocial.motivoAnormalidadeMenstruacao;
        }
        return desabilitarBotao;
      }
      else if (this.formularioHistoricoSocial.menopausa && this.formularioHistoricoSocial.quantosAnosEstaNaMenopausa) {
        return desabilitarBotao;
      }
      return true;
    }

    return desabilitarBotao;
  }

  private prepararDadosParaCadastroDoHistorico(): void {
    if (this.informacoesParaCadastro && this.respostaSimNao) {
      this.informacoesParaCadastro.patologias.forEach(patologia => this.patologias.push({ label: patologia.descricao, value: patologia.id }));

      this.converterParaListagemDropdown(this.estadoCivil, this.informacoesParaCadastro.estadoCivil);
      this.converterParaListagemDropdown(this.consumoBebidasAlcoolicas, this.informacoesParaCadastro.consumoBebidasAlcoolicas);
      this.converterParaListagemDropdown(this.consumoCigarro, this.informacoesParaCadastro.consumoCigarro);
      this.converterParaListagemDropdown(this.habitoIntestinal, this.informacoesParaCadastro.habitoIntestinal);
      this.converterParaListagemDropdown(this.consistenciaFezes, this.informacoesParaCadastro.consistenciaFezes);
      this.converterParaListagemDropdown(this.frequenciaDiurese, this.informacoesParaCadastro.frequenciaDiurese);

      this.informacoesParaCadastro.imagensColoracaoDiurese.forEach(imagem => 
        this.imagensColoracaoDiurese.push({
          label: imagem.coloracaoDiurese.descricao, value: imagem.id, icon: imagem.uuidImagemCorBase64
        }));
    }
  }

  private converterParaListagemDropdown(selectItem: SelectItem[], lista: any[]): void {
    lista.forEach(item => selectItem.push({ label: item.descricao, value: item.codigo }));
  }

  public resetarMenstruacao(): void {
    this.formularioHistoricoSocial.menstruacaoNormal = null;
    this.formularioHistoricoSocial.motivoAnormalidadeMenstruacao = null;
  }

  public resetarMenopausa(): void {
    this.formularioHistoricoSocial.menopausa = null;
    this.formularioHistoricoSocial.quantosAnosEstaNaMenopausa = null;
  }

  public resetarCampos(): void {
    this.abrirDialogCadastro = false;

    this.formularioHistoricoSocial = new HistoricoSocialFORM();
    this.patologiasSelecionadasDropdown = [];
    this.formularioPatologiasSelecionadas = [];
    this.imagensColoracaoDiureseSelecionadas = [];
  }
}
