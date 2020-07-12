import { Pessoa, Contato } from './../pessoa.model';
import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-pessoa-contato',
  templateUrl: './pessoa-contato.component.html',
  styleUrls: ['./pessoa-contato.component.css']
})
export class PessoaContatoComponent implements OnInit {

  @Input() pessoa: Pessoa;
  exibirFormularioContato = false;

  constructor() { }

  ngOnInit() {
  }

  prepararNovoContato = () => {
    this.exibirFormularioContato = true;
  }

  receiveNovoContatoInserido = (novoContatoInserido: Contato) => {
    console.log('receiveNovoContatoInserido', novoContatoInserido);
    this.pessoa.contatos.push(novoContatoInserido);
    this.exibirFormularioContato = false;
  }

}
