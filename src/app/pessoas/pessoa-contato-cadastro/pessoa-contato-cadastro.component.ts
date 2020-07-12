import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Contato } from './../pessoa.model';
import { InvokeFunctionExpr } from '@angular/compiler';

@Component({
  selector: 'app-pessoa-contato-cadastro',
  templateUrl: './pessoa-contato-cadastro.component.html',
  styleUrls: ['./pessoa-contato-cadastro.component.css']
})
export class PessoaContatoCadastroComponent implements OnInit {

  @Input() exibindoFormularioContato: boolean;
  @Input() contato: Contato;
  @Input() contatoIndex: number;

  @Output() changeContatoEvent = new EventEmitter<Contato>();
  @Output() changeExibirFormularioContatoEvent = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  confirmarContato = (frm: FormControl) => {
    console.log('confirmarContato', this.contato);
    this.changeContatoEvent.emit(this.contato);
    this.contato = new Contato();
    frm.reset();
  }

  get actionFormularioContato() {
    return this.contato.codigo ? 'Editando Contato' : 'Novo Contato';
  }

  onHideModal = () => {
    this.changeExibirFormularioContatoEvent.emit(this.exibindoFormularioContato);
  }

}
