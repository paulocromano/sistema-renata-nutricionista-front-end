import { SuplementoPaciente } from './suplemento-paciente.model';

export class HistoricoAlimentar {

    id: number;
    intoleranciaAlergiaAlimentosPaciente: string;
    preferenciaAlimentar: string;
    alimentosPacienteNaoGosta: string;
    alteracoesGastrointestinal: string;
    consumoAgua: string;
    suplementosPaciente: SuplementoPaciente[] = [];
    medicamentosPaciente: string;
    dataHoraCadastroHistoricoAlimentar: string;
}