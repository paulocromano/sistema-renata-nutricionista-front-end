import { PreviaHistoricoSocial } from './previa-historico-social.model';

export class InformacoesPreviasHistoricosSociais {

    previaHistoricosSociais: PreviaHistoricoSocial[] = [];
    dataProximaAtualizacaoHistoricoSocial: string;
    historicoEstaDesatualizado: boolean;
    possuiHistorico: boolean;
}