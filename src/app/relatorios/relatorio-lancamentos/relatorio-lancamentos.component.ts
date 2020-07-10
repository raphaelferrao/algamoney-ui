import { Component, OnInit } from '@angular/core';

import { RelatoriosService } from './../relatorios.service';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  periodoInicio: Date;
  periodoFim: Date;
  salvando = false;

  constructor(
    private relatoriosService: RelatoriosService
  ) { }

  ngOnInit() {
  }

  gerar = () => {
    this.relatoriosService.relatoriosLancamentosPorPessoa(this.periodoInicio, this.periodoFim)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);
        window.open(url);
      });
  }

}
