import { PreviaHistoricoPatologiaFamiliaresPorData } from './previa-historico-patologia-familiares-por-data.model';

export class InformacoesPreviasHistoricosFamiliaresPorData {

    previaHistoricosPatologiaFamiliaresPorData: PreviaHistoricoPatologiaFamiliaresPorData[] = [];
    dataProximaAtualizacaoHistoricoPatologiasFamiliares: string;
    historicoEstaDesatualizado: boolean;
}