import { HistoricoPatologiaFamiliares } from "./historico-patologia-familiares.model";

export class HistoricoPatologiaFamiliaresPorData {

    id: number;
    observacao: string;
    dataHoraCadastroPatologiasFamiliares: string;
    patologiasFamiliares: HistoricoPatologiaFamiliares[] = [];
}