import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService
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

}
