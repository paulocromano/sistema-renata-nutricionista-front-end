import { DadosEnum } from '../../../shared/model/dados-enum.model';
import { Paciente } from './paciente.model';

export class ListagemCadastroPaciente {

    pacientes: Paciente[];
    etniasPaciente: DadosEnum[];
}