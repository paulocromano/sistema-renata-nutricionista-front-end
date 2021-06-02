import { PatologiaPacienteFORM } from './patologia-paciente.form';

export class HistoricoSocialFORM {

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
    patologiasPaciente: PatologiaPacienteFORM[] = [];
    horasSono: number;
    menstruacaoNormal: string;
    motivoAnormalidadeMenstruacao: string;
    menopausa: string;
    quantosAnosEstaNaMenopausa: number;
}