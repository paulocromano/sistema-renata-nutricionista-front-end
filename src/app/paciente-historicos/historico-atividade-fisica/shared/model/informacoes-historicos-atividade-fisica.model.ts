import { HistoricoAtividadeFisica } from './historico-atividade-fisica.model';

export class InformacoesHistoricosAtividadeFisica {

    historicosAtividadesFisicas: HistoricoAtividadeFisica[] = [];
    dataProximaAtualizacaoHistoricoAtividadeFisica: string;
    historicoEstaDesatualizado: boolean;
}