import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categorias/categoria.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categorias: any[];

  pessoas: any[];

  constructor(
    private errorHandlerService: ErrorHandlerService,
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService
  ) { }

  ngOnInit() {
    this.listarTodasCategorias();
    this.listarTodasPessoas();
  }

  listarTodasCategorias(){
    this.categoriaService.listarTodas()
      .then( (resultado) => {
        this.categorias = resultado.map( categoria => {
          return { label: categoria.nome, value: categoria.codigo };
        });
      })
      .catch( (error) => {
        this.errorHandlerService.handle(error);
      });
  }

  listarTodasPessoas(){
    this.pessoaService.listarTodas()
      .then( (resultado) => {
        this.pessoas = resultado.map( pessoa => {
          return { label: pessoa.nome, value: pessoa.codigo };
        });
      })
      .catch( (error) => {
        this.errorHandlerService.handle(error);
      });
  }

}
