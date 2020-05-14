import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { PessoaService } from './../pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Pessoa } from './../pessoa.model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  salvando = false;
  pessoa = new Pessoa();

  constructor(
    private errorHandlerService: ErrorHandlerService,
    private messageService: MessageService,
    private pessoaService: PessoaService
  ) { }

  ngOnInit() {
  }

  salvar(form: FormControl) {
    this.salvando = true;
    this.pessoaService.adicionar(this.pessoa)
      .then( (resultado) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Pessoa adicionada com sucesso!'
        });
        form.reset();
        this.pessoa = new Pessoa();
        this.salvando = false;
      })
      .catch( (error) => {
        this.salvando = false;
        this.errorHandlerService.handle(error);
      });
  }

}
