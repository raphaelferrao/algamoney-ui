import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private categoriasUrl = 'http://localhost:8090/categorias';

  constructor(private http: HttpClient) { }

  listarTodas = (): Promise<any> => {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.categoriasUrl}`, {headers})
      .toPromise()
      .then(response => response);
  }

}
