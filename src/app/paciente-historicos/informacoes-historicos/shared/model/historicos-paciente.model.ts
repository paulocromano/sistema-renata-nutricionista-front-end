import { DataProximaAtualizacaoHistoricosPaciente } from './data-proxima-atualizacao-historicos-paciente.model';
import { InformacoesPreviasQuestionario } from '../../../historico-questionario-frequencia-alimentar/shared/model/informacoes-previas-questionario.model';
import { PreviaHistoricoPatologiaFamiliaresPorData } from '../../../historico-patologia-familiares-por-data/shared/model/previa-historico-patologia-familiares-por-data.model';
import { HistoricoAtividadeFisica } from '../../../historico-atividade-fisica/shared/model/historico-atividade-fisica.model';
import { InformacoesPreviasHistoricoAlimentar } from '../../../historico-alimentar/shared/model/informacoes-previas-historico-alimentar.model';
import { InformacoesPreviasHistoricoSocial } from '../../../historico-social/shared/model/informacoes-previas-historico-social.model';
import { Paciente } from '../../../../paciente/shared/model/paciente.model';

export class HistoricosPaciente {

    paciente: Paciente = new Paciente();
    previaHistoricoSocial: InformacoesPreviasHistoricoSocial[] = [];
    previaHistoricoAlimentar: InformacoesPreviasHistoricoAlimentar[] = [];
    historicoAtividadeFisica: HistoricoAtividadeFisica[] = [];
    previaHistoricoPatologiaFamiliaresPorData: PreviaHistoricoPatologiaFamiliaresPorData[] = [];
    previaQuestionariosFrequenciaAlimentar: InformacoesPreviasQuestionario[] = [];
    dataProximaAtualizacaoHistoricosPaciente: DataProximaAtualizacaoHistoricosPaciente = new DataProximaAtualizacaoHistoricosPaciente();
}