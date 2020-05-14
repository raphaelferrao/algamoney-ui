export class Endereco {
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  siglaUf: string;
}

export class Pessoa {

  codigo: number;
  label: string;
  value: string;

  nome: string;
  ativo = true;
  endereco = new Endereco();

  constructor() {

  }
}
