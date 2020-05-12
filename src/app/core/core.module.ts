import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PessoaService } from '../pessoas/pessoa.service';
import { LancamentoService } from '../lancamentos/lancamento.service';

@NgModule({
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule
  ],
  declarations: [
    NavbarComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    MessageService,
    ConfirmationService,
    LancamentoService,
    PessoaService,
    ErrorHandlerService
  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule
  ]
})
export class CoreModule { }
