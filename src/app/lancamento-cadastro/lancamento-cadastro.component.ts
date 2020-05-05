import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [
    {label: 'Alimentação', value: 1},
    {label: 'Transporte', value: 2}
  ];

  pessoas = [
    {label: 'João da Silva', value: 1},
    {label: 'José Tortugo', value: 2},
    {label: 'Maria Aparecida', value: 3},
    {label: 'Warysson Gomes', value: 4}
  ];



  constructor() { }

  ngOnInit() {
  }

}
