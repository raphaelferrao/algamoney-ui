import { Pessoa } from './../pessoa.model';
import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-pessoa-contato',
  templateUrl: './pessoa-contato.component.html',
  styleUrls: ['./pessoa-contato.component.css']
})
export class PessoaContatoComponent implements OnInit {

  @Input() pessoa: Pessoa;
  // @Output() exibirFormularioContato = new EventEmitter<boolean>();
  exibirFormularioContato = false;

  constructor() { }

  ngOnInit() {
  }

  prepararNovoContato = () => {
    this.exibirFormularioContato = true;
    console.log('exibirFormularioContato', this.exibirFormularioContato);
    // this.exibirFormularioContato.emit(true);
  }

  /*
  receiveExibirFormularioContato = (exibirFormularioContato: boolean) => {
    this.exibindoFormularioContato = exibirFormularioContato;
  }
  */

}
