import { CondutaNutricionalFORM } from './../../../shared/model/conduta-nutricional.form';
import { AvaliacaoMassaMuscularCorporeaFORM } from './../../../shared/model/avaliacao-massa-muscular-corporea.form';
import { AvaliacaoComposicaoCorporalFORM } from './../../../shared/model/avaliacao-composicao-corporal.form';
import { AvaliacaoConsumoHabitualFORM } from './../../../shared/model/avaliacao-consumo-habitual.form';
import { RegistroDietaFORM } from './../../../shared/model/registro-dieta.form';

export class ConsultaFORM {
    
    registroDietaHabitual: RegistroDietaFORM = new RegistroDietaFORM();
    avaliacaoConsumoHabitual: AvaliacaoConsumoHabitualFORM = new AvaliacaoConsumoHabitualFORM();
    avaliacaoComposicaoCorporal: AvaliacaoComposicaoCorporalFORM = new AvaliacaoComposicaoCorporalFORM();
    avaliacaoMassaMuscularCorporea: AvaliacaoMassaMuscularCorporeaFORM = new AvaliacaoMassaMuscularCorporeaFORM();
    condutaNutricional: CondutaNutricionalFORM = new CondutaNutricionalFORM();
}