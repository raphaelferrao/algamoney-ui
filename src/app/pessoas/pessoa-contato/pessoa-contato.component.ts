import { Pessoa, Contato } from './../pessoa.model';
import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-pessoa-contato',
  templateUrl: './pessoa-contato.component.html',
  styleUrls: ['./pessoa-contato.component.css']
})
export class PessoaContatoComponent implements OnInit {

  @Input() contatos: Array<Contato>;
  exibirFormularioContato = false;
  contato: Contato;
  contatoIndex: number;

  constructor() { }

  ngOnInit() {
  }

  prepararNovoContato = () => {
    this.exibirFormularioContato = true;
    this.contato = new Contato();
    this.contatoIndex = this.contatos.length;
  }

  receiveContato = (contatoFromChild: Contato) => {
    console.log('contatoFromChild', contatoFromChild);
    this.contatos[this.contatoIndex] = contatoFromChild;
    this.exibirFormularioContato = false;
    this.contato = new Contato();
  }

  receiveExibirFormularioContato = (exibirFormularioContatoChild: boolean) => {
    this.exibirFormularioContato = exibirFormularioContatoChild;
  }

  prepararEditarContato = (contato: Contato, contatoIndex: number) => {
    this.exibirFormularioContato = true;
    this.contato = {...contato};
    this.contatoIndex = contatoIndex;
    console.log('prepararEditarContato', this.contato, this.contatoIndex);
  }

  removerContato = (contatoIndex: number) => {
    this.contatos.splice(contatoIndex, 1);
  }

}
