import { ParametrosAtendimentoPaciente } from './../../../parametros-atendimento-paciente/shared/model/parametros-atendimento-paciente.model';
import { HorarioAtendimento } from './../../../parametros-horario-atendimento/shared/model/horario-atendimento.model';

export class ParametrosAtendimento {

    horariosAtendimento: HorarioAtendimento[] = [];
    atendimentoPacienteParametro: ParametrosAtendimentoPaciente = new ParametrosAtendimentoPaciente();
}