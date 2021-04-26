import { Patologia } from './../../../../patologia/shared/model/patologia.model';

export class PatologiaPaciente {

    id: number;
    quantosAnosPosssuiPatologia: number;
    patologia: Patologia = new Patologia();
}