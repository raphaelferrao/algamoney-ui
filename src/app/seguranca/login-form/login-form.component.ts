import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  logando = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {

  }

  login = (usuario: string, senha: string) => {
    this.logando = true;
    this.authService.login(usuario, senha)
      .then( (resultado) => {
        this.router.navigate(['/lancamentos']);
      })
      .catch( (error) => {
        this.logando = false;
        this.errorHandlerService.handle(error);
      });
  }

}
