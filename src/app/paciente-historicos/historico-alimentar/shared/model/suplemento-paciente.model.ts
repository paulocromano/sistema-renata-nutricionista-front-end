import { Suplemento } from './../../../../suplemento/shared/model/suplemento.model';

export class SuplementoPaciente {

    id: number;
    dose: string;
    formaPreparo: string;
    suplemento: Suplemento = new Suplemento();

    mensagemDoseUtilizadaPeloPacienteDiferenteDoSuplemento: string;
    mensagemFormaPreparoUtilizadaPeloPacienteDiferenteDoSuplemento: string;
}