import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AppComponent } from './app.component';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';


@NgModule({
  declarations: [AppComponent, LancamentosPesquisaComponent, NavbarComponent, PessoasPesquisaComponent],
  imports: [BrowserModule, InputTextModule, ButtonModule, TableModule, TooltipModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
