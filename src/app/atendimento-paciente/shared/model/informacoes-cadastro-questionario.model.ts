import { DadosEnum } from '../../../shared/model/dados-enum.model';
import { AlimentoFrequenciaAlimentar } from './alimento-frequencia-alimentar.model';

export class InformacoesCadastroQuestionario {

    alimentosFrequenciaAlimentar: AlimentoFrequenciaAlimentar[] = [];
    consumoCarneVermelha: DadosEnum[] = [];
    consumoFrango: DadosEnum[] = [];
    consumoPeixe: DadosEnum[] = [];
    consumoTipoBebida: DadosEnum[] = [];
    consumoTipoLeite: DadosEnum[] = [];
    frequenciaConsumoAlimento: DadosEnum[] = [];
}