import { FrequenciaAlimentar } from './frequencia-alimentar.model';

export class QuestionarioFrequenciaAlimentar {

    id: number;
    dataHoraCadastroQuestionario: string;
    frequenciaConsumoAlimentos: FrequenciaAlimentar[] = [];
    consumoTipoBebida: string;
    consumoTipoLeite: string;
    consumoCarneVermelha: string;
    consumoFrango: string;
    consumoPeixe: string;
}