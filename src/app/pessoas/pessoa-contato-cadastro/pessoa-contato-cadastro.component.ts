import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Contato } from './../pessoa.model';

@Component({
  selector: 'app-pessoa-contato-cadastro',
  templateUrl: './pessoa-contato-cadastro.component.html',
  styleUrls: ['./pessoa-contato-cadastro.component.css']
})
export class PessoaContatoCadastroComponent implements OnInit {

  @Input() exibindoFormularioContato: boolean;
  @Output() novoContatoInserido = new EventEmitter<Contato>();

  novoContato: Contato;
  salvando = false;

  constructor() {
    this.novoContato = new Contato();
  }

  ngOnInit() {
  }

  confirmarContato = (frm: FormControl) => {
    this.salvando = true;
    console.log('confirmarContato', this.novoContato);
    this.novoContatoInserido.emit(this.novoContato);
    this.novoContato = new Contato();
    this.salvando = false;
    frm.reset();
  }


}
