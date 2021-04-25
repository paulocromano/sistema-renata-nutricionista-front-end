  
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { SelectItem } from 'primeng/api';

import { PacienteService } from './../shared/service/paciente.service';
import { EnderecoFORM } from './../shared/model/endereco.form';
import { PacienteFORM } from './../shared/model/paciente.form';
import { ToastyComponent } from './../../shared/toasty/toasty.component';
import { DadosEnum } from './../../shared/model/dados-enum.mode';
import { Endereco } from './../shared/model/endereco.model';
import { EnderecoService } from './../shared/service/endereco.service';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.css']
})

export class CadastroPacienteComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  @Input() public etnias: DadosEnum[];
  @Output() public pacienteSalvo: EventEmitter<boolean> = new EventEmitter<boolean>();

  public cadastroPaciente: PacienteFORM = new PacienteFORM();
  public cadastroEndereco: EnderecoFORM = new EnderecoFORM();
  public campoCEPParaValidarNovaRequisicaoAPI: string;

  public abrirDialogCadastroPaciente: boolean = false;
  public processandoOperacao: boolean = false;
  public buscandoEnderecoPeloCEP: boolean = false;
  public etniasDropdown: SelectItem[] = [];

  constructor(
    private pacienteService: PacienteService,
    private enderecoService: EnderecoService
    ) { }

  ngOnInit(): void {
    this.etnias.forEach(etnia => this.etniasDropdown.push({ label: etnia.descricao, value: etnia.codigo }));
   }

  public buscarEnderecoConformeCEP(cep: string): void {
    this.buscandoEnderecoPeloCEP = true;

    this.enderecoService.buscarEnderecoConformeCEP(cep)
      .subscribe((endereco: Endereco) => {
        this.cadastroEndereco = endereco;
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

  public validarCampoCEPParaPreenchimentoAutomatico(): void {
    if (!this.cadastroEndereco.cep.endsWith('_') && this.cadastroEndereco.cep.length === 9) {
      if (!this.processandoOperacao && this.campoCEPParaValidarNovaRequisicaoAPI !== this.cadastroEndereco.cep) {
        this.buscarEnderecoConformeCEP(this.cadastroEndereco.cep.replace('-', ''));
        this.campoCEPParaValidarNovaRequisicaoAPI = this.cadastroEndereco.cep;
      }
    }
  }

  public cadastrarPaciente(): void {
    this.processandoOperacao = true;

    if (!this.cadastroEndereco.numero) {
      this.cadastroEndereco.numero = 's/n';
    }
    this.cadastroPaciente.endereco = this.cadastroEndereco;

    this.pacienteService.cadastrarPaciente(this.cadastroPaciente)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.toasty.success('Paciente cadastrado com sucesso!');
        this.limparCamposFormulario();
        this.pacienteSalvo.emit(true);
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao cadastrar paciente!');
        this.pacienteSalvo.emit(false);
      });
  }

  public informacoesPacienteNaoEstaoValidas(): boolean {
    return !(this.cadastroPaciente.nome && this.cadastroPaciente.sexo && this.cadastroPaciente.etnia 
      && this.cadastroPaciente.dataNascimento && this.cadastroPaciente.telefone)
      || this.informacoesEnderecoNaoEstaoValidas();
  }

  private informacoesEnderecoNaoEstaoValidas(): boolean {
    return !(this.cadastroEndereco.logradouro && this.cadastroEndereco.bairro && this.cadastroEndereco.cidade 
      && this.cadastroEndereco.cep && this.cadastroEndereco.uf);
  }

  public limparCamposFormulario(): void {
    this.abrirDialogCadastroPaciente = false;
    this.campoCEPParaValidarNovaRequisicaoAPI = null;

    this.cadastroPaciente = new PacienteFORM();
    this.cadastroEndereco = new EnderecoFORM();
  }
}
