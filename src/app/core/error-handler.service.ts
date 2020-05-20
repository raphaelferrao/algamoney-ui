import { NotAuthenticatedError } from './../seguranca/money-http-interceptor';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if ( errorResponse instanceof NotAuthenticatedError ) {
      msg = 'Sua sessão expirou!';
      this.router.navigate(['/login']);

    } else if ( (errorResponse instanceof HttpErrorResponse) &&
      (errorResponse.status >= 400 && errorResponse.status <= 499) ) {

      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar essa ação!';
      } else if (errorResponse.error && errorResponse.error.messages && errorResponse.error.messages[0]) {
        msg = errorResponse.error.messages[0].friendlyMessage;
      } else {
        msg = 'Ocorreu um erro ao processar a sua solicitação';
      }
      console.log('Ocorreu um erro', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.log('Ocorreu um erro', errorResponse);
    }

    this.messageService.add({
      severity: 'error',
      summary: msg
    });
  }
}
