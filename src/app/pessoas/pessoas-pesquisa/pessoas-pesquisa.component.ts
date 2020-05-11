import { LazyLoadEvent } from 'primeng/api';
import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  pessoas: any[];
  totalRegistros: 0;
  filtro = new PessoaFiltro();

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
  }

  pesquisar = (pagina = 0) => {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then( (result) => {
        this.pessoas = result.pessoas;
        this.totalRegistros = result.total;
      });
  }

  aoMudarPagina = (event: LazyLoadEvent) => {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

}
