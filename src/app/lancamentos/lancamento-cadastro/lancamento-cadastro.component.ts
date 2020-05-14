import { Categoria } from './../../categorias/categoria.model';
import { Pessoa } from './../../pessoas/pessoa.model';
import { MessageService } from 'primeng/api';
import { LancamentoService } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';

import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { Lancamento } from './../lancamento.model';
import { FormControl } from '@angular/forms';

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

  categorias: Categoria[];
  pessoas: Pessoa[];
  lancamento = new Lancamento();
  salvando = false;

  constructor(
    private errorHandlerService: ErrorHandlerService,
    private messageService: MessageService,
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService
  ) { }

  ngOnInit() {
    this.listarTodasCategorias();
    this.listarTodasPessoas();
  }

  listarTodasCategorias() {
    this.categoriaService.listarTodas()
      .then( (resultado) => {
        this.categorias = resultado.map( categoria => {
          return { codigo: categoria.codigo, label: categoria.nome, value: categoria.codigo };
        });
      })
      .catch( (error) => {
        this.errorHandlerService.handle(error);
      });
  }

  listarTodasPessoas() {
    this.pessoaService.listarTodas()
      .then( (resultado) => {
        this.pessoas = resultado.map( pessoa => {
          return { codigo: pessoa.codigo, label: pessoa.nome, value: pessoa.codigo };
        });
      })
      .catch( (error) => {
        this.errorHandlerService.handle(error);
      });
  }

  salvar(form: FormControl) {
    this.salvando = true;
    this.lancamentoService.adicionar(this.lancamento)
      .then( (resultado) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Lançamento adicionado com sucesso!'
        });
        form.reset();
        this.lancamento = new Lancamento();
        this.salvando = false;
      })
      .catch( (error) => {
        this.salvando = false;
        this.errorHandlerService.handle(error);
      });
  }
}
