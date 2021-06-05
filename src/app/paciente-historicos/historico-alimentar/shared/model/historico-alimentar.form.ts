import { SuplementoPaciente } from './suplemento-paciente.model';

export class HistoricoAlimentarFORM {

    intoleranciaAlergiaAlimentosPaciente: string;
    preferenciaAlimentarPaciente: string;
    alimentosPacienteNaoGosta: string;
    alteracoesGastrointestinal: string;
    consumoAgua: string;
    idMedicamentos: number[] = [];
    suplementosPaciente: SuplementoPaciente[] = [];
}