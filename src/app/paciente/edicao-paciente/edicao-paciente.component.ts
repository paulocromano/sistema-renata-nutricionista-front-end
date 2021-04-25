import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { PacienteService } from './../shared/service/paciente.service';
import { Paciente } from './../shared/model/paciente.model';
import { ToastyComponent } from './../../shared/toasty/toasty.component';
import { EdicaoPacienteFORM } from './../shared/model/edicao-paciente.form';
import { EnderecoFORM } from './../shared/model/endereco.form';
import { EnderecoService } from './../shared/service/endereco.service';
import { Endereco } from './../shared/model/endereco.model';

@Component({
  selector: 'app-edicao-paciente',
  templateUrl: './edicao-paciente.component.html',
  styleUrls: ['./edicao-paciente.component.css']
})

export class EdicaoPacienteComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  @Input() public paciente: Paciente;
  @Output() public pacienteEditado: EventEmitter<boolean> = new EventEmitter<boolean>();

  public pacienteSelecionado: EdicaoPacienteFORM = new EdicaoPacienteFORM();
  public edicaoEndereco: EnderecoFORM = new EnderecoFORM();

  public abrirDialogEdicaoPaciente: boolean = false;
  public processandoOperacao: boolean = false;
  public buscandoEnderecoPeloCEP: boolean = false;
  public campoCEPParaValidarNovaRequisicaoAPI: string;

  constructor(
    private pacienteService: PacienteService,
    private enderecoService: EnderecoService
    ) { }

  ngOnInit(): void {
    this.converterParaEdicaoPacienteFORM();
   }


  private converterParaEdicaoPacienteFORM(): void {
    this.pacienteSelecionado.telefone = this.paciente.telefone;
    this.pacienteSelecionado.telefoneRecado = this.paciente.telefoneRecado;
    this.edicaoEndereco = this.paciente.endereco;
  }

  public editarInformacoesPaciente(): void {
    this.processandoOperacao = true;
    this.pacienteSelecionado.endereco = this.edicaoEndereco;

    this.pacienteService.editarPaciente(this.paciente.id, this.pacienteSelecionado)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.limparCamposFormulario();
        this.pacienteEditado.emit(true);
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;

        if (errorResponse.error.status === 400 || errorResponse.error.status === 404) {
          this.toasty.error(errorResponse.error.message);
        }
        else {
          this.toasty.error('Erro ao salvar as alterações do paciente!');
        }
      });
  }

  public validarCampoCEPParaPreenchimentoAutomatico(): void {
    if (!this.edicaoEndereco.cep.endsWith('_') && this.edicaoEndereco.cep.length === 9) {
      if (!this.processandoOperacao && this.campoCEPParaValidarNovaRequisicaoAPI !== this.edicaoEndereco.cep) {
        this.buscarEnderecoConformeCEP(this.edicaoEndereco.cep.replace('-', ''));
        this.campoCEPParaValidarNovaRequisicaoAPI = this.edicaoEndereco.cep;
      }
    }
  }

  public buscarEnderecoConformeCEP(cep: string): void {
    this.buscandoEnderecoPeloCEP = true;

    this.enderecoService.buscarEnderecoConformeCEP(cep)
      .subscribe((endereco: Endereco) => {
        this.edicaoEndereco = endereco;
        this.buscandoEnderecoPeloCEP = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.buscandoEnderecoPeloCEP = false;

        if (errorResponse.error.status === 400 || errorResponse.error.status === 404) {
          this.toasty.error(errorResponse.error.message);
        }
        else {
          this.toasty.error('Erro ao buscar endereço!');
        }
      });
  }

  public informacoesParaEdicaoNaoMudaram(): boolean {
    return (this.pacienteSelecionado.telefone == this.paciente.telefone 
      && this.pacienteSelecionado.telefoneRecado === this.paciente.telefoneRecado
      && JSON.stringify(this.edicaoEndereco) == JSON.stringify(this.paciente.endereco));
  }

  public informacoesPacienteNaoEstaoValidas(): boolean {
    return !this.pacienteSelecionado.telefone || this.informacoesEnderecoNaoEstaoValidas();
  }

  private informacoesEnderecoNaoEstaoValidas(): boolean {
    return !(this.edicaoEndereco.logradouro && this.edicaoEndereco.bairro && this.edicaoEndereco.cidade 
      && this.edicaoEndereco.cep && this.edicaoEndereco.uf);
  }

  public limparCamposFormulario(): void {
    this.abrirDialogEdicaoPaciente = false;
    this.campoCEPParaValidarNovaRequisicaoAPI = null;

    this.pacienteSelecionado = new EdicaoPacienteFORM();
    this.edicaoEndereco = new EnderecoFORM();
  }
}
