import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ViaCEPApiService } from './../shared/service/via-cep-api.service';
import { PacienteService } from './../shared/service/paciente.service';
import { EnderecoFORM } from './../shared/model/endereco.form';
import { PacienteFORM } from './../shared/model/paciente.form';
import { ToastyComponent } from './../../shared/toasty/toasty.component';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.css']
})

export class CadastroPacienteComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  @Output()
  public pacienteSalvo: EventEmitter<boolean> = new EventEmitter<boolean>();

  public cadastroPaciente: PacienteFORM;
  public cadastroEndereco: EnderecoFORM;

  public abrirDialogCadastroPaciente: boolean = false;
  public processandoOperacao: boolean = false;

  constructor(
    private pacienteService: PacienteService,
    private viaCEPApiService: ViaCEPApiService
    ) { }

  ngOnInit(): void { }

  public buscarEnderecoConformeCEP(cep: string): void {
    this.processandoOperacao = true;

    this.viaCEPApiService.buscarEnderecoConformeCEP(cep)
      .subscribe((endereco: any) => {
        if (endereco?.erro) {
         this.toasty.warning('CEP não encontrado!');
        }
        else {
          this.cadastroEndereco = endereco;
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
}
