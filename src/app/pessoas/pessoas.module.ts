import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';

import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PessoasRoutingModule,

    PanelModule,
    RouterModule,
    ButtonModule,
    SelectButtonModule,
    InputTextModule,
    TableModule,
    InputMaskModule,
    TooltipModule,
    SharedModule
  ],
  declarations: [
    PessoasPesquisaComponent,
    PessoaCadastroComponent
  ],
  exports: [

  ]
})
export class PessoasModule { }
