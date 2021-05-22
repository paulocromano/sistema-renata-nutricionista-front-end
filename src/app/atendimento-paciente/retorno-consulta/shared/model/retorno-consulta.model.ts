import { AvaliacaoMassaMuscularCorporea } from './../../../shared/model/avaliacao-massa-muscular-corporea.model';
import { RefeicoesRegistroDieta } from '../../../shared/model/refeicoes-registro-dieta.model';
import { CondutaNutricional } from './../../../shared/model/conduta-nutricional.model';
import { AvaliacaoComposicaoCorporal } from './../../../shared/model/avaliacao-composicao-corporal.model';
import { AvaliacaoConsumoHabitual } from './../../../shared/model/avaliacao-consumo-habitual.model';

export class RetornoConsulta {

    id: number;
    situacaoRetorno: string;
    data: string;
    horario: string;
    dificuldadesParaSeguirOrientacoes: string;
	alteracoesSintomas: string;
	alteracoesQueimacoes: string;
	alteracoesMedicamentos: string;
    avaliacaoConsumoHabitual: AvaliacaoConsumoHabitual = new AvaliacaoConsumoHabitual();
    avaliacaoComposicaoCorporal: AvaliacaoComposicaoCorporal = new AvaliacaoComposicaoCorporal();
    avaliacaoMassaMuscularCorporea: AvaliacaoMassaMuscularCorporea = new AvaliacaoMassaMuscularCorporea();
    condutaNutricional: CondutaNutricional = new CondutaNutricional();
    refeicoesRegistroDietaHabitual: RefeicoesRegistroDieta[] = [];
    refeicoesRegistroDieta24Horas: RefeicoesRegistroDieta[] = [];
}