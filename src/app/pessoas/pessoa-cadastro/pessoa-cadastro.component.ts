import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { PessoaService } from './../pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Pessoa } from './../pessoa.model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  salvando = false;
  pessoa = new Pessoa();
  exibindoFormularioContato = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private errorHandlerService: ErrorHandlerService,
    private messageService: MessageService,
    private pessoaService: PessoaService
  ) { }

  ngOnInit() {

    const { codigo } = this.route.snapshot.params;
    if (codigo) {
      this.obterPessoa(codigo);
      this.title.setTitle('Edição de Pessoa');
    } else {
      this.title.setTitle('Nova Pessoa');
    }
  }

  salvar = (form: FormControl) => {
    if ( this.editando ) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
    this.salvando = true;
    this.pessoaService.adicionar(this.pessoa)
      .then( (pessoaCriada) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Pessoa adicionada com sucesso!'
        });
        this.router.navigate(['/pessoas', pessoaCriada.codigo]);
        this.salvando = false;
      })
      .catch( (error) => {
        this.salvando = false;
        this.errorHandlerService.handle(error);
      });
  }

  atualizarPessoa = (form: FormControl) => {
    this.salvando = true;
    this.pessoaService.atualizar(this.pessoa)
      .then( (pessoaAlterada) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Pessoa alterada com sucesso!'
        });
        this.pessoa = pessoaAlterada;
        this.salvando = false;
      })
      .catch( (error) => {
        this.salvando = false;
        this.errorHandlerService.handle(error);
      });
  }

  obterPessoa = (codigo: number) => {
    this.pessoaService.buscarPorCodigo(codigo)
      .then( (pessoaEncontrada) => {
        this.pessoa = pessoaEncontrada;
      })
      .catch( (error) => {
        this.errorHandlerService.handle(error);
      });
  }

  novo = (form: FormControl) => {
    form.reset();
    setTimeout(() => {
      this.pessoa = new Pessoa();
    }, 1);
    this.router.navigate(['/pessoas/novo']);
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  receiveExibirFormularioContato = (exibirFormularioContato: boolean) => {
    this.exibindoFormularioContato = exibirFormularioContato;
  }

}
