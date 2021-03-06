import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private oauthTokenUrl: string;
  private tokensRevokeUrl: string;
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.carregarToken();
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
  }

  login = (usuario: string, senha: string): Promise<void> => {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEBy')
      .append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true})
      .toPromise()
      .then(response => {
        console.log('Login realizado com sucesso!');
        this.armazenarToken((response as any).access_token);
      })
      .catch(response => {
        console.error('Erro ao realizar login', response);
        if ( response.status === 400 ) {
          const responseError = response.error;
          if (responseError.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }

        return Promise.reject(response);
      });
  }

  private armazenarToken = (token: string) => {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken = () => {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  isAccessTokenInvalido = () => {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao = (permissao: string) => {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temAlgumaPermissao = (roles: string[]) => {
    let temPermissao = null;

    if (roles) {
      temPermissao = roles.find( (role) => this.temPermissao(role) );
    }

    return temPermissao || false;
  }

  obterNomeUsuarioLogado = () => {
    return this.jwtPayload ? this.jwtPayload.nome : '';
  }

  obterNovoAccessToken = (): Promise<void> => {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEBy')
      .append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken((response as any).access_token);
        console.log('Novo access token criado!');
        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve(null);
      });
  }

  limparAccessToken = () => {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  logout = () => {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEBy');

    return this.http.delete(this.tokensRevokeUrl, { headers, withCredentials: true })
      .toPromise()
      .then(() => {
        console.log('Logout realizado com sucesso!');
        this.limparAccessToken();
      })
      .catch(response => {
        console.error('Erro ao realizar logout.', response);
      });
  }

}
