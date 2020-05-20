import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ErrorHandlerService } from './../error-handler.service';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
  ) {

  }

  ngOnInit() {
  }

  get usuarioLogado() {
    return this.authService.obterNomeUsuarioLogado();
  }

  temPermissao = (permissao: string) => {
    return this.authService.temPermissao(permissao);
  }

  logout = () => {
    this.authService.logout()
      .then( () => {
        this.router.navigate(['login']);
      })
      .catch( (error) => {
        this.errorHandlerService.handle(error);
      });
  }

}
