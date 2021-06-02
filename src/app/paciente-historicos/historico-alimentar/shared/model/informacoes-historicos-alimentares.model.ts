import { PreviaHistoricoAlimentar } from './previa-historico-alimentar.model';

export class InformacoesPreviasHistoricosAlimentares {

    previaHistoricosAlimentares: PreviaHistoricoAlimentar[] = [];
    dataProximaAtualizacaoHistoricoAlimentar: string;
    historicoEstaDesatualizado: boolean;
}