import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
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

    @ViewChild('tabela', {static: true}) grid: Table;

    ngOnInit(): void {
    }

    constructor(
      private lancamentoService: LancamentoService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private errorHandlerService: ErrorHandlerService
    ) {

    }

    pesquisar = (pagina = 0) => {
      this.filtro.pagina = pagina;

      this.lancamentoService.pesquisar(this.filtro)
        .then( (result) => {
          this.lancamentos = result.lancamentos;
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

    confirmarExclusao = (lancamento: any) => {
      this.confirmationService.confirm({
        message: 'Tem certeza que deseja excluir?',
        accept: () => {
          this.excluir(lancamento);
        }
      });
    }

    private excluir = (lancamento: any) => {
      this.lancamentoService.excluir(lancamento.codigo)
        .then(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Lançamento excluído com sucesso!'
          });
          this.grid.reset();
        })
        .catch( (error) => {
          this.errorHandlerService.handle(error);
        });
    }

}
