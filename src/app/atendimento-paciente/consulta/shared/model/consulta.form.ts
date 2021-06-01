import { CondutaNutricionalFORM } from '../../../ficha-consulta-retorno/shared/model/conduta-nutricional.form';
import { AvaliacaoMassaMuscularCorporeaFORM } from '../../../ficha-consulta-retorno/shared/model/avaliacao-massa-muscular-corporea.form';
import { AvaliacaoComposicaoCorporalFORM } from '../../../ficha-consulta-retorno/shared/model/avaliacao-composicao-corporal.form';
import { AvaliacaoConsumoHabitualFORM } from '../../../ficha-consulta-retorno/shared/model/avaliacao-consumo-habitual.form';
import { RegistroDietaFORM } from '../../../ficha-consulta-retorno/shared/model/registro-dieta.form';

export class ConsultaFORM {
    
    registroDietaHabitual: RegistroDietaFORM;
    avaliacaoConsumoHabitual: AvaliacaoConsumoHabitualFORM;
    avaliacaoComposicaoCorporal: AvaliacaoComposicaoCorporalFORM;
    avaliacaoMassaMuscularCorporea: AvaliacaoMassaMuscularCorporeaFORM;
    condutaNutricional: CondutaNutricionalFORM;
}