import { CondutaNutricionalFORM } from '../../../ficha-consulta-retorno/shared/model/conduta-nutricional.form';
import { AvaliacaoMassaMuscularCorporeaFORM } from '../../../ficha-consulta-retorno/shared/model/avaliacao-massa-muscular-corporea.form';
import { AvaliacaoComposicaoCorporalFORM } from '../../../ficha-consulta-retorno/shared/model/avaliacao-composicao-corporal.form';
import { AvaliacaoConsumoHabitualFORM } from '../../../ficha-consulta-retorno/shared/model/avaliacao-consumo-habitual.form';
import { RegistroDietaFORM } from '../../../ficha-consulta-retorno/shared/model/registro-dieta.form';

export class RetornoConsultaFORM {

    dificuldadesParaSeguirOrientacoes: string;
    alteracoesSintomas: string;
    alteracoesQueimacoes: string;
    alteracoesMedicamentos: string;
    registroDietaHabitual: RegistroDietaFORM = new RegistroDietaFORM();
    registroDieta24Horas: RegistroDietaFORM = new RegistroDietaFORM();
    avaliacaoConsumoHabitual: AvaliacaoConsumoHabitualFORM = new AvaliacaoConsumoHabitualFORM();
    avaliacaoComposicaoCorporal: AvaliacaoComposicaoCorporalFORM = new AvaliacaoComposicaoCorporalFORM();
    avaliacaoMassaMuscularCorporea: AvaliacaoMassaMuscularCorporeaFORM = new AvaliacaoMassaMuscularCorporeaFORM();
    condutaNutricional: CondutaNutricionalFORM = new CondutaNutricionalFORM();
}