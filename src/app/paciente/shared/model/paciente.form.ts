import { EnderecoFORM } from './endereco.form';

export class PacienteFORM {
    
    nome: string;
    dataNascimento: string;
    sexo: string;
    etnia: string;
    telefone: string;
    telefoneRecado: string;
    endereco: EnderecoFORM = new EnderecoFORM();
}