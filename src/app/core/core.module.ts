import { SegurancaModule } from './../seguranca/seguranca.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PessoaService } from '../pessoas/pessoa.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { CategoriaService } from '../categorias/categoria.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    RouterModule,
    SegurancaModule
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    Title,
    MessageService,
    ConfirmationService,
    LancamentoService,
    PessoaService,
    CategoriaService,
    ErrorHandlerService
  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule,
    SegurancaModule
  ]
})
export class CoreModule { }
