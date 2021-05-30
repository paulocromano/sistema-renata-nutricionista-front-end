import { InformacoesCadastroConsumoQuestionario } from './informacoes-cadastro-consumo-questionario.model';
import { InformacoesCadastroHistoricoSocial } from './informacoes-cadastro-historico-social.model';
import { DadosEnum } from './../../../shared/model/dados-enum.model';
import { Paciente } from './../../../paciente/shared/model/paciente.model';

export class InformacoesCadastroAtendimento {

    paciente: Paciente = new Paciente();
    dataAtendimento: string;
    historicoSocial: InformacoesCadastroHistoricoSocial = new InformacoesCadastroHistoricoSocial();
    consumoQuestionarioFrequenciaAlimentar: InformacoesCadastroConsumoQuestionario = new InformacoesCadastroConsumoQuestionario();
    respostaSimNao: DadosEnum[] = [];
    patologiaFamiliares: DadosEnum[] = [];
    frequenciaAtividadeFisica: DadosEnum[] = [];
}