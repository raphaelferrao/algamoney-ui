import { Pessoa } from './../pessoa.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pessoa-contato',
  templateUrl: './pessoa-contato.component.html',
  styleUrls: ['./pessoa-contato.component.css']
})
export class PessoaContatoComponent implements OnInit {

  @Input() pessoa: Pessoa;

  constructor() { }

  ngOnInit() {
  }

}
