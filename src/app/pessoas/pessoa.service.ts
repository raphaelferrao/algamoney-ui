import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';
import { Pessoa } from './pessoa.model';

export class PessoaFiltro {
  nome: string;
  pagina =  0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private pessoasUrl: string;

  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }

  pesquisar = (filtro: PessoaFiltro): Promise<any> => {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { params })
      .toPromise()
      .then(response => {
        const pessoas = response['content'];
        const total = response['totalElements'];

        const resultado = {
          pessoas, total
        };

        return resultado;
      });
  }

  listarTodas = (): Promise<any> => {
    return this.http.get(`${this.pessoasUrl}`)
      .toPromise()
      .then(response => response['content']);
  }

  excluir = (codigo: number): Promise<void> => {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then( () => null);
  }

  mudarStatus = (codigo: number, ativo: boolean): Promise<void> => {
    const headers = new HttpHeaders()
      .append('Content-type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then( () => null);
  }

  adicionar = (pessoa: Pessoa): Promise<Pessoa> => {
    return this.http.post<Pessoa>(`${this.pessoasUrl}`, pessoa)
      .toPromise()
      .then(response => response);
  }

  atualizar = (pessoa: Pessoa): Promise<Pessoa> => {
    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
      .toPromise()
      .then(response => response);
  }

  buscarPorCodigo = (codigo: number): Promise<Pessoa> => {
    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(response => response);
  }

}
