import { Categoria } from './../categorias/categoria.model';
import { Pessoa } from './../pessoas/pessoa.model';

export class Lancamento {

  codigo: number;
  tipo = 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();

  constructor() {

  }
}
