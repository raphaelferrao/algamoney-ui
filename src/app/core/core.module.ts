import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

import { RelatoriosService } from './../relatorios/relatorios.service';
import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PessoaService } from '../pessoas/pessoa.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { CategoriaService } from '../categorias/categoria.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { AuthService } from './../seguranca/auth.service';
import { SegurancaModule } from './../seguranca/seguranca.module';
import { NaoAutorizadoComponent } from './nao-autorizado.component';

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
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    Title,
    MessageService,
    ConfirmationService,
    LancamentoService,
    PessoaService,
    CategoriaService,
    DashboardService,
    RelatoriosService,
    ErrorHandlerService,
    AuthService
  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule,
    SegurancaModule
  ]
})
export class CoreModule { }
