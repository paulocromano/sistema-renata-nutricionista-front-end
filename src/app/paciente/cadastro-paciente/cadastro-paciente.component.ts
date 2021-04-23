import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { ViaCEPApiService } from './../shared/service/via-cep-api.service';
import { PacienteService } from './../shared/service/paciente.service';
import { EnderecoFORM } from './../shared/model/endereco.form';
import { PacienteFORM } from './../shared/model/paciente.form';
import { ToastyComponent } from './../../shared/toasty/toasty.component';
import { DadosEnum } from './../../shared/model/dados-enum.mode';

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

  constructor(
    private pacienteService: PacienteService,
    private viaCEPApiService: ViaCEPApiService
    ) { }

  ngOnInit(): void {
    
    console.log(this.etnias);
   }

  public buscarEnderecoConformeCEP(cep: string): void {
    this.processandoOperacao = true;

    this.viaCEPApiService.buscarEnderecoConformeCEP(cep)
      .subscribe((endereco: any) => {
        if (endereco?.erro) {
         this.toasty.warning('CEP não encontrado!');
        }
        else {
          this.cadastroEndereco = endereco;
          this.cadastroEndereco.cidade = endereco.localidade;
        }

        this.processandoOperacao = false;
      },
      (error: HttpErrorResponse) => {
        this.processandoOperacao = false;

        if (error.status === 400) {
          this.toasty.error('Formato de CEP inválido!');
        }
        else {
          this.toasty.error('Erro ao consultar o CEP do Paciente!');
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

  public limparCamposFormulario(): void {
    this.abrirDialogCadastroPaciente = false;
    this.campoCEPParaValidarNovaRequisicaoAPI = null;

    this.cadastroPaciente = new PacienteFORM();
    this.cadastroEndereco = new EnderecoFORM();
  }
}
