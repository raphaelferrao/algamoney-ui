import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private categoriasUrl = 'http://localhost:8090/categorias';

  constructor(private http: HttpClient) { }

  listarTodas = (): Promise<any> => {
    return this.http.get(`${this.categoriasUrl}`)
      .toPromise()
      .then(response => response);
  }

}
