import { Patologia } from './../../../patologia/shared/model/patologia.model';
import { DadosEnum } from './../../../shared/model/dados-enum.model';

export class InformacoesCadastroHistoricoSocial {

    patologias: Patologia[] = [];
    estadoCivil: DadosEnum[] = [];
    consumoBebidasAlcoolicas: DadosEnum[] = [];
    consumoCigarro: DadosEnum[] = [];
    habitoIntestinal: DadosEnum[] = [];
    consistenciaFezes: DadosEnum[] = [];
    frequenciaDiurese: DadosEnum[] = [];
    coloracaoDiurese: DadosEnum[] = [];
}