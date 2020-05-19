import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  email: string;
  senha: string;
  logando = false;

  constructor(

  ) { }

  ngOnInit() {

  }

  login = (form: FormControl) => {
  }

}
