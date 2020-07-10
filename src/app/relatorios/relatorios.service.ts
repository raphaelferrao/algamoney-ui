import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  private lancamentosUrl: string;
  private lancamentosRelatorioPorPessoaUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
    this.lancamentosRelatorioPorPessoaUrl = `${this.lancamentosUrl}/relatorios/por-pessoa`;
  }

  relatoriosLancamentosPorPessoa = (inicio: Date, fim: Date) => {
    let params = new HttpParams();

    params = params.set('dataInicio', moment(inicio).format('YYYY-MM-DD'));
    params = params.set('dataFim', moment(fim).format('YYYY-MM-DD'));

    return this.http.get(`${this.lancamentosRelatorioPorPessoaUrl}`,
      { params, responseType: 'blob' })
      .toPromise()
      .then(response => response);
  }

}
