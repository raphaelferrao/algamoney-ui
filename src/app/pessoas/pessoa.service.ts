import { Pessoa } from './pessoa.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PessoaFiltro {
  nome: string;
  pagina =  0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private pessoasUrl = 'http://localhost:8090/pessoas';

  constructor(private http: HttpClient) { }

  pesquisar = (filtro: PessoaFiltro): Promise<any> => {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { headers, params })
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
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.pessoasUrl}`, { headers })
      .toPromise()
      .then(response => response['content']);
  }

  excluir = (codigo: number): Promise<void> => {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers })
      .toPromise()
      .then( () => null);
  }

  mudarStatus = (codigo: number, ativo: boolean): Promise<void> => {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then( () => null);
  }

  adicionar = (pessoa: Pessoa): Promise<Pessoa> => {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-type', 'application/json');

    return this.http.post<Pessoa>(`${this.pessoasUrl}`, pessoa, { headers })
      .toPromise()
      .then(response => response);
  }
}
