import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { Categoria } from './../../categorias/categoria.model';
import { Pessoa } from './../../pessoas/pessoa.model';
import { LancamentoService } from './../lancamento.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { Lancamento } from './../lancamento.model';
import { Title } from '@angular/platform-browser';

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
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private errorHandlerService: ErrorHandlerService,
    private messageService: MessageService,
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService
  ) { }

  ngOnInit() {
    this.listarTodasCategorias();
    this.listarTodasPessoas();

    const { codigo } = this.route.snapshot.params;
    if (codigo) {
      this.obterLancamento(codigo);
      this.title.setTitle('Edição de Lançamento');
    } else {
      this.title.setTitle('Novo Lançamento');
    }
  }

  listarTodasCategorias = () => {
    this.categoriaService.listarTodas()
      .then( (resultado) => {
        this.categorias = resultado.map( categoria => {
          return { ...categoria, label: categoria.nome, value: categoria.codigo.toString() };
        });
      })
      .catch( (error) => {
        this.errorHandlerService.handle(error);
      });
  }

  listarTodasPessoas = () => {
    this.pessoaService.listarTodas()
      .then( (resultado) => {
        this.pessoas = resultado.map( pessoa => {
          return { ...pessoa, label: pessoa.nome, value: pessoa.codigo.toString() };
        });
        console.log(this.pessoas);
      })
      .catch( (error) => {
        this.errorHandlerService.handle(error);
      });
  }

  salvar = (form: FormControl) => {
    if ( this.editando ) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento = (form: FormControl) => {
    this.salvando = true;
    this.lancamentoService.adicionar(this.lancamento)
      .then( (lancamentoCriado) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Lançamento adicionado com sucesso!'
        });
        this.router.navigate(['/lancamentos', lancamentoCriado.codigo]);
        this.salvando = false;
      })
      .catch( (error) => {
        this.salvando = false;
        this.errorHandlerService.handle(error);
      });
  }

  atualizarLancamento = (form: FormControl) => {
    this.salvando = true;
    this.lancamentoService.atualizar(this.lancamento)
      .then( (lancamentoAlterado) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Lançamento alterado com sucesso!'
        });
        this.tratarAtributosParaPreencherDropdowns(lancamentoAlterado);
        this.lancamento = lancamentoAlterado;
        this.salvando = false;
      })
      .catch( (error) => {
        this.salvando = false;
        this.errorHandlerService.handle(error);
      });
  }

  obterLancamento = (codigo: number) => {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then( (lancamentoEncontrado) => {
        this.tratarAtributosParaPreencherDropdowns(lancamentoEncontrado);
        this.lancamento = lancamentoEncontrado;
      })
      .catch( (error) => {
        this.errorHandlerService.handle(error);
      });
  }

  novo = (form: FormControl) => {
    form.reset();
    setTimeout(() => {
      this.lancamento = new Lancamento();
    }, 1);
    this.router.navigate(['/lancamentos/novo']);
  }

  private tratarAtributosParaPreencherDropdowns = (lancamento: Lancamento) => {
    if (lancamento.pessoa) {
      lancamento.pessoa = {...lancamento.pessoa,
        label: lancamento.pessoa.nome,
        value: lancamento.pessoa.codigo.toString()
      };
    }

    if (lancamento.categoria) {
      lancamento.categoria = {...lancamento.categoria,
        label: lancamento.categoria.nome,
        value: lancamento.categoria.codigo.toString()
      };
    }
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

}
