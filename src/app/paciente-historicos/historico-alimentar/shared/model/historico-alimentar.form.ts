import { SuplementoPacienteFORM } from './suplemento-paciente.form';

export class HistoricoAlimentarFORM {

    intoleranciaAlergiaAlimentosPaciente: string;
    preferenciaAlimentarPaciente: string;
    alimentosPacienteNaoGosta: string;
    alteracoesGastrointestinal: string;
    consumoAgua: string;
    idMedicamentos: number[] = [];
    suplementosPaciente: SuplementoPacienteFORM[] = [];
}