import { HttpErrorResponse } from '@angular/common/http';
import { HorarioAtendimentoService } from './shared/service/horario-atendimento.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { SelectItem } from 'primeng/api';

import { ToastyComponent } from './../shared/toasty/toasty.component';
import { EdicaoHorarioAtendimentoFORM } from './shared/model/edicao-horario-atendimento.form';
import { HorarioAtendimentoFORM } from './shared/model/horario-atendimento.form';
import { HorarioAtendimento } from './shared/model/horario-atendimento.model';
import { DadosEnum } from './../shared/model/dados-enum.model';
import { TokenService } from './../shared/service/token.service';

@Component({
  selector: 'app-horario-atendimento',
  templateUrl: './horario-atendimento.component.html',
  styleUrls: ['./horario-atendimento.component.css']
})

export class HorarioAtendimentoComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  public usuarioAdmin: boolean = false;

  public diasDeAtendimento: HorarioAtendimento[] = [];
  public diaDeAtendimentoSelecionado: HorarioAtendimento = new HorarioAtendimento();
  public novoDiaDeAtendimento: HorarioAtendimentoFORM = new HorarioAtendimentoFORM();
  public edicaoDiaDeAtendimento: EdicaoHorarioAtendimentoFORM = new EdicaoHorarioAtendimentoFORM();
  public diasDisponiveisDaSemanaParaCadastro: SelectItem[] = [];
  public codigoDiaDaSemanaParaCadastro: string = '';

  public colunasTabela: any[];
  public processandoOperacao: boolean = false;
  public exibirDialogCadastro: boolean = false;
  public exibirDialogEdicao: boolean = false;
  public exibirDialogExclusao: boolean = false;

  constructor(
    private horarioAtendimentoService: HorarioAtendimentoService,
    private tokenService: TokenService
    ) { }

  ngOnInit(): void {
    this.usuarioAdmin = this.tokenService.contemPermissaoAdmin();

    this.colunasTabela = [
      { header: 'Dia', field: 'diaDaSemana', style: 'col-dia-semana' },
      { header: 'Entrada/Saída (antes do almoço)', field: 'entradaSaidaAntesDoAlmoco', style: 'col-entrada-saida-antes-almoco' },
      { header: 'Entrada/Saída (depois do almoço)', field: 'entradaSaidaDepoisDoAlmoco', style: 'col-entrada-saida-depois-almoco' }
    ];

    if (this.usuarioAdmin) {
      this.colunasTabela.push({ header: 'Ações', field: 'acoes', style: 'col-acoes' });
      this.listarDiasDaSemanaDisponiveisParaCadastro();
    }

    
    this.listarHorariosAtendimento();
  }

  private listarDiasDaSemanaDisponiveisParaCadastro(): void {
    this.diasDisponiveisDaSemanaParaCadastro = [];
    
    this.horarioAtendimentoService.listarDiasDaSemanaDisponiveisParaCadastro()
      .subscribe((diasDisponiveisParaCadastro: DadosEnum[]) => {
        diasDisponiveisParaCadastro.forEach(diaDisponivel => 
          this.diasDisponiveisDaSemanaParaCadastro.push({ label: diaDisponivel.descricao, value: diaDisponivel.codigo }));
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;

        if (errorResponse.status === 400) {
          this.toasty.error(errorResponse.error.message)
        }
        else {
          this.toasty.error('Erro ao listar os dias da semana disponíveis para cadastro!');
        }
      });
  }

  private listarHorariosAtendimento(): void {
    this.processandoOperacao = true;

    this.horarioAtendimentoService.listarHorariosAtendimento()
      .subscribe((diasDeAtendimento: HorarioAtendimento[]) => {
        this.diasDeAtendimento = diasDeAtendimento;
        this.processandoOperacao = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao listar os dias de atendimento!');
      });
  }

  public salvarDiaDeAtendimento(): void {
    this.processandoOperacao = true;
    this.novoDiaDeAtendimento.diaDaSemana = this.codigoDiaDaSemanaParaCadastro;

    this.horarioAtendimentoService.cadastrarDiaDeAtendimento(this.novoDiaDeAtendimento)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.toasty.success('Dia de atendimento cadastrado com sucesso!');
        this.resetarCampos();
        this.listarDiasDaSemanaDisponiveisParaCadastro();
        this.listarHorariosAtendimento();
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;

        if (errorResponse.status === 400) {
          this.toasty.error(errorResponse.error.message);
        }
        else {
          this.toasty.error('Erro ao cadastrar dia de atendimento!');
        }
      });
  }

  public editarDiaDeAtendimento(): void {
    this.processandoOperacao = true;

    this.horarioAtendimentoService.atualizarHorariosDeUmDiaDaSamana(this.diaDeAtendimentoSelecionado.id, this.edicaoDiaDeAtendimento)
      .subscribe(() => {
        this.processandoOperacao = false;
        this.toasty.success('Dia de atendimento editado com sucesso!');
        this.resetarCampos();
        this.listarDiasDaSemanaDisponiveisParaCadastro();
        this.listarHorariosAtendimento();
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;

        if (errorResponse.status === 400) {
          this.toasty.error(errorResponse.error.message);
        }
        else {
          this.toasty.error('Erro ao editar dia de atendimento!');
        }
      });
  }

  public excluirDiaDeAtendimento(): void {
    this.processandoOperacao = true;

    this.horarioAtendimentoService.excluirUmDiaDeAtendimento(this.diaDeAtendimentoSelecionado.id)
      .subscribe(() => {
        this.resetarCampos();
        this.processandoOperacao = false;
        this.listarDiasDaSemanaDisponiveisParaCadastro();
        this.listarHorariosAtendimento();
      },
      (errorResponse: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error('Erro ao excluir dia de atendimento!');
      });
  }

  public abrirDialogCadastro(): void {
    this.exibirDialogCadastro = true;
  }

  public armazenarDiaAtendimentoParaEdicao(diaAtendimento: HorarioAtendimento): void {
    this.diaDeAtendimentoSelecionado = diaAtendimento;
    let horarioEntradaSaida: string[];

    if (diaAtendimento.entradaSaidaAntesDoAlmoco && diaAtendimento.entradaSaidaAntesDoAlmoco !== '---') {
      horarioEntradaSaida = diaAtendimento.entradaSaidaAntesDoAlmoco.split(' às ');
      this.edicaoDiaDeAtendimento.horarioEntradaAntesAlmoco = horarioEntradaSaida[0].replace('h', '');
      this.edicaoDiaDeAtendimento.horarioSaidaAntesAlmoco =  horarioEntradaSaida[1].replace('h', '');
    }

    if (diaAtendimento.entradaSaidaDepoisDoAlmoco && diaAtendimento.entradaSaidaDepoisDoAlmoco !== '---') {
      horarioEntradaSaida = diaAtendimento.entradaSaidaDepoisDoAlmoco.split(' às ');
      this.edicaoDiaDeAtendimento.horarioEntradaDepoisAlmoco = horarioEntradaSaida[0].replace('h', '');
      this.edicaoDiaDeAtendimento.horarioSaidaDepoisAlmoco =  horarioEntradaSaida[1].replace('h', '');
    }

    this.exibirDialogEdicao = true;
  }

  public armazenarDiaAtendimentoParaExclusao(diaAtendimento: HorarioAtendimento): void {
    this.diaDeAtendimentoSelecionado = diaAtendimento;
    this.exibirDialogExclusao = true;
  }

  public desabilitarBotaoCadastroDiaDeAtendimento(): boolean {
    return this.processandoOperacao || !(this.novoDiaDeAtendimento 
      && this.codigoDiaDaSemanaParaCadastro
      && (this.novoDiaDeAtendimento.horarioEntradaAntesAlmoco || this.novoDiaDeAtendimento.horarioEntradaDepoisAlmoco)
      && this.horariosEstaoValidos(this.novoDiaDeAtendimento.horarioEntradaAntesAlmoco, this.novoDiaDeAtendimento.horarioSaidaAntesAlmoco)
      && this.horariosEstaoValidos(this.novoDiaDeAtendimento.horarioEntradaDepoisAlmoco, this.novoDiaDeAtendimento.horarioSaidaDepoisAlmoco));
  }

  public desabilitarBotaoEdicaoDiaDeAtendimento(): boolean {
    return this.processandoOperacao || !(this.edicaoDiaDeAtendimento 
      && (this.edicaoDiaDeAtendimento.horarioEntradaAntesAlmoco || this.edicaoDiaDeAtendimento.horarioEntradaDepoisAlmoco)
      && this.horariosEstaoValidos(this.edicaoDiaDeAtendimento.horarioEntradaAntesAlmoco, this.edicaoDiaDeAtendimento.horarioSaidaAntesAlmoco)
      && this.horariosEstaoValidos(this.edicaoDiaDeAtendimento.horarioEntradaDepoisAlmoco, this.edicaoDiaDeAtendimento.horarioSaidaDepoisAlmoco));
  }

  private horariosEstaoValidos(horarioEntrada: string, horarioSaida: string): boolean {
    if (horarioEntrada || horarioSaida) {
      return (horarioEntrada !== '' && !horarioEntrada.includes('_')) 
        && (horarioSaida && horarioSaida !== '' && !horarioSaida.includes('_'));
    }
    
    return true;
  }

  public resetarCampos(): void {
    this.exibirDialogCadastro = false;
    this.exibirDialogEdicao = false;
    this.exibirDialogExclusao = false;

    this.novoDiaDeAtendimento = new HorarioAtendimentoFORM();
    this.edicaoDiaDeAtendimento = new EdicaoHorarioAtendimentoFORM();
    this.diaDeAtendimentoSelecionado = new HorarioAtendimento();
    this.codigoDiaDaSemanaParaCadastro = '';
  }
}
