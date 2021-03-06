import { AuthService } from './../../seguranca/auth.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService, PessoaFiltro } from './../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  pessoas: any[];
  totalRegistros: 0;
  filtro = new PessoaFiltro();

  @ViewChild('tabela', {static: true}) grid: Table;

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private authService: AuthService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Pessoas');
  }

  pesquisar = (pagina = 0) => {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then( (result) => {
        this.pessoas = result.pessoas;
        this.totalRegistros = result.total;
      })
      .catch( (error) => {
        this.errorHandlerService.handle(error);
      });
  }

  aoMudarPagina = (event: LazyLoadEvent) => {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao = (pessoa: any) => {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  private excluir = (pessoa: any) => {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Pessoa excluída com sucesso!'
        });
        this.grid.reset();
      })
      .catch( (error) => {
        this.errorHandlerService.handle(error);
      });
  }

  mudarStatus = (pessoa: any) => {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';
        pessoa.ativo = novoStatus;

        this.messageService.add({
          severity: 'success',
          summary: `Pessoa ${acao} com sucesso!`
        });
      })
      .catch( (error) => {
        this.errorHandlerService.handle(error);
      });
  }

  temPermissao = (permissao: string) => {
    return this.authService.temPermissao(permissao);
  }

}
