import { PatologiaPaciente } from './patologia-paciente.model';

export class HistoricoSocial {

    id: number;
    profissao: string;
    estadoCivil: string;
    composicaoFamiliar: string;
    localRefeicoes: string;
    frequenciaConsumoBebidasAlcoolicas: string;
    consumoCigarro: string;
    quantidadeCigarrosPorDia: number;
    habitoIntestinal: string;
    consistenciaFezes: string;
    frequenciaDiurese: string;
    coloracaoDiurese: string;
    patologiasPaciente: PatologiaPaciente[] = [];
    horasSono: number;
    menstruacaoNormal: string;
    motivoAnormalidadeMenstruacao: string;
    menopausa: string;
    quantosAnosEstaNaMenopausa: number;
    dataHoraCadastroHistoricoSocial: string;
}