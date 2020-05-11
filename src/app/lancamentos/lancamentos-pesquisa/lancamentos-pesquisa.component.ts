import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

    lancamentos: any[];
    totalRegistros: 0;
    filtro = new LancamentoFiltro();

    ngOnInit(): void {
    }

    constructor(private lancamentoService: LancamentoService) {

    }

    pesquisar = (pagina = 0) => {
      this.filtro.pagina = pagina;

      this.lancamentoService.pesquisar(this.filtro)
        .then( (result) => {
          this.lancamentos = result.lancamentos;
          this.totalRegistros = result.total;
        });
    }

    aoMudarPagina = (event: LazyLoadEvent) => {
      const pagina = event.first / event.rows;
      this.pesquisar(pagina);
    }

}
