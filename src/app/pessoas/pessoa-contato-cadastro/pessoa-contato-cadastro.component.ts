import { Component, OnInit, Input } from '@angular/core';

import { Contato } from './../pessoa.model';

@Component({
  selector: 'app-pessoa-contato-cadastro',
  templateUrl: './pessoa-contato-cadastro.component.html',
  styleUrls: ['./pessoa-contato-cadastro.component.css']
})
export class PessoaContatoCadastroComponent implements OnInit {

  @Input() exibindoFormularioContato: boolean;
  novoContato: Contato;
  salvando = false;

  constructor() {
    this.novoContato = new Contato();
  }

  ngOnInit() {
  }

  salvarContato = () => {
    this.salvando = true;
  }


}
