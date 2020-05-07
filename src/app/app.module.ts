import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {SelectButtonModule} from 'primeng/selectbutton';
import {DropdownModule} from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

import { AppComponent } from './app.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from './message/message.component';
import { LancamentosGridComponent } from './lancamentos-grid/lancamentos-grid.component';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';


@NgModule({
  declarations: [AppComponent, LancamentosPesquisaComponent, NavbarComponent,
    PessoasPesquisaComponent, LancamentoCadastroComponent, PessoaCadastroComponent, MessageComponent, LancamentosGridComponent, PessoasGridComponent],
  imports: [BrowserModule, BrowserAnimationsModule, InputTextModule,
    ButtonModule, TableModule, TooltipModule,
    InputTextareaModule, CalendarModule, SelectButtonModule,
    DropdownModule, CurrencyMaskModule, InputMaskModule,
    FormsModule, MessageModule, MessagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
