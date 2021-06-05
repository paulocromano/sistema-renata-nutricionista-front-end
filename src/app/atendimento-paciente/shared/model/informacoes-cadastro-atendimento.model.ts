import { InformacoesCadastroHistoricoAlimentar } from './informacoes-cadastro-historico-alimentar.model';
import { InformacoesCadastroQuestionario } from './informacoes-cadastro-questionario.model';
import { InformacoesCadastroHistoricoSocial } from './informacoes-cadastro-historico-social.model';
import { DadosEnum } from './../../../shared/model/dados-enum.model';
import { Paciente } from './../../../paciente/shared/model/paciente.model';

export abstract class InformacoesCadastroAtendimento {

    paciente: Paciente = new Paciente();
    dataAtendimento: string;
    historicoSocial: InformacoesCadastroHistoricoSocial = new InformacoesCadastroHistoricoSocial();
    questionarioFrequenciaAlimentar: InformacoesCadastroQuestionario = new InformacoesCadastroQuestionario();
    historicoAlimentar: InformacoesCadastroHistoricoAlimentar = new InformacoesCadastroHistoricoAlimentar();
    tiposDeRefeicoesParaCadastroRegistroDieta: string[] = [];
    respostaSimNao: DadosEnum[] = [];
    patologiasFamiliares: DadosEnum[] = [];
    frequenciaAtividadeFisica: DadosEnum[] = [];
}