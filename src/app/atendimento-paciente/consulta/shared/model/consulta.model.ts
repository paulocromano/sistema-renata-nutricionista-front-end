import { RefeicoesRegistroDieta } from '../../../shared/model/refeicoes-registro-dieta.model';
import { CondutaNutricional } from './../../../shared/model/conduta-nutricional.model';
import { AvaliacaoMassaMuscularCorporea } from './../../../shared/model/avaliacao-massa-muscular-corporea.model';
import { AvaliacaoComposicaoCorporal } from './../../../shared/model/avaliacao-composicao-corporal.model';
import { AvaliacaoConsumoHabitual } from './../../../shared/model/avaliacao-consumo-habitual.model';

export class Consulta {

    id: number;
    situacaoConsulta: string;
    data: string;
    horario: string;
    formaPagamento: string;
    numeroParcelas: number;
    valorConsulta: string;
    motivoConsulta: string;
    avaliacaoConsumoHabitual: AvaliacaoConsumoHabitual = new AvaliacaoConsumoHabitual();
    avaliacaoComposicaoCorporal: AvaliacaoComposicaoCorporal = new AvaliacaoComposicaoCorporal();
    avaliacaoMassaMuscularCorporea: AvaliacaoMassaMuscularCorporea = new AvaliacaoMassaMuscularCorporea();
    condutaNutricional: CondutaNutricional = new CondutaNutricional();
    refeicoesRegistroDietaHabitual: RefeicoesRegistroDieta[] = [];
}