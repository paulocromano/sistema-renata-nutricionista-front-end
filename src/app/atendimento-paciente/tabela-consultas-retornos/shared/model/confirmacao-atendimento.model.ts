import { DadosEnum } from '../../../../shared/model/dados-enum.model';

export class ConfirmacaoAtendimento {

    formasPagamento: DadosEnum[] = [];
    quantidadeParcelas: number[] = [];
    precoConsulta: string;
}