import { InformacoesPreviasHistoricosFamiliaresPorData } from './../../../historico-patologia-familiares-por-data/shared/model/informacoes-previas-historicos-familiares-data.model';
import { InformacoesPreviasQuestionarios } from './../../../historico-questionario-frequencia-alimentar/shared/model/informacoes-previas-questionarios.model';
import { InformacoesHistoricosAtividadesFisicas } from './../../../historico-atividade-fisica/shared/model/informacoes-historicos-atividades-fisicas.model';
import { InformacoesPreviasHistoricosAlimentares } from './../../../historico-alimentar/shared/model/informacoes-historicos-alimentares.model';
import { InformacoesPreviasHistoricosSociais } from '../../../historico-social/shared/model/informacoes-previas-historicos-sociais.model';
import { Paciente } from '../../../../paciente/shared/model/paciente.model';

export class HistoricosPaciente {

    paciente: Paciente = new Paciente();
    informacoesPreviasHistoricosSociais: InformacoesPreviasHistoricosSociais = new InformacoesPreviasHistoricosSociais();
    informacoesPreviasHistoricosAlimentares: InformacoesPreviasHistoricosAlimentares = new InformacoesPreviasHistoricosAlimentares();
    informacoesHistoricosAtividadesFisicas: InformacoesHistoricosAtividadesFisicas = new InformacoesHistoricosAtividadesFisicas();
    informacoesPreviasHistoricosPatologiaFamiliaresPorData: InformacoesPreviasHistoricosFamiliaresPorData = 
        new InformacoesPreviasHistoricosFamiliaresPorData();
    informacoesPreviasQuestionariosFrequenciaAlimentar: InformacoesPreviasQuestionarios = new InformacoesPreviasQuestionarios();
}