import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';

import { SelectItem } from 'primeng/api';
import { DadosEnum } from 'src/app/shared/model/dados-enum.model';
import { Paciente } from './../../../paciente/shared/model/paciente.model';
import { AtividadeFisicaFORM } from './../shared/model/atividade-fisica.form';
import { HistoricoAtividadeFisicaService } from './../shared/service/historico-atividade-fisica.service';
import { ToastyComponent } from './../../../shared/toasty/toasty.component';

@Component({
  selector: 'app-cadastro-atividade-fisica',
  templateUrl: './cadastro-atividade-fisica.component.html',
  styleUrls: ['./cadastro-atividade-fisica.component.css']
})

export class CadastroAtividadeFisicaComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  @Input() public paciente: Paciente;
  @Input() public exibirBotaoCadastrarHistorico: boolean = false;
  @Input() public frequenciaAtividadeFisica: DadosEnum[];
  @Output() public cadastroHistorico: EventEmitter<boolean> = new EventEmitter();

  public formularioAtividadeFisica: AtividadeFisicaFORM = new AtividadeFisicaFORM();
  public frequenciaAtividadeFisicaDropdown: SelectItem[] = [];

  public abrirDialogCadastro: boolean = false;
  public processandoOperacao: boolean = false;

  constructor(private historicoAtividadeFisicaService: HistoricoAtividadeFisicaService) { }

  ngOnInit(): void {
    if (this.exibirBotaoCadastrarHistorico) {
      this.prepararDadosParaCadastroDeAtividadeFisica();
    }
  }

  public cadastrarAtividadeFisica(): void {
    this.processandoOperacao = true;

    this.historicoAtividadeFisicaService.cadastrarAtividadeFisicaDoPaciente(this.paciente.id, this.formularioAtividadeFisica)
      .subscribe(() => {
        this.toasty.success('Atividade física cadastrada com sucesso!');
        this.resetarCampos();
        this.processandoOperacao = false;
        this.cadastroHistorico.emit(true);
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao cadastrar atividade física!');
        this.cadastroHistorico.emit(false);
      });
  }

  private prepararDadosParaCadastroDeAtividadeFisica(): void {
    if (this.frequenciaAtividadeFisica) {
      this.frequenciaAtividadeFisica.forEach(frequencia => this.frequenciaAtividadeFisicaDropdown.push({ 
        label: frequencia.descricao, value: frequencia.codigo
       }));
    }
  }

  public alteracaoFrequenciaAtividadeFisica(event: any): void {
    if (this.formularioAtividadeFisica.frequenciaAtividadeFisica === 'N') {
      this.formularioAtividadeFisica.atividadePraticada = null;
      this.formularioAtividadeFisica.duracao = null;
    }
  }

  public desabilitarBotaoCadastroAtividadeFisica(): boolean {
    if (this.formularioAtividadeFisica.frequenciaAtividadeFisica) {
      if (this.formularioAtividadeFisica.frequenciaAtividadeFisica === 'N') {
        return this.processandoOperacao;
      }
      else if (this.formularioAtividadeFisica.frequenciaAtividadeFisica !== 'N') {
        return this.processandoOperacao || !(this.formularioAtividadeFisica.atividadePraticada && this.formularioAtividadeFisica.duracao
          && !this.formularioAtividadeFisica.duracao.includes('_'));
      }
    }
    else {
      return true;
    }
  }

  public resetarCampos(): void {
    this.abrirDialogCadastro = false;
    this.formularioAtividadeFisica = new AtividadeFisicaFORM();
  }
}
