import { Endereco } from './endereco.model';

export class Paciente {

    id: number;
    nome: string;
    dataNascimento: string;
    sexo: string;
    etnia: string;
    telefone: string;
    telefoneRecado: string;
    endereco: Endereco = new Endereco();
    dataCadastro: string
}