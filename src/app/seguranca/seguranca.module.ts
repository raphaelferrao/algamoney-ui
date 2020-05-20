import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { InputTextModule } from 'primeng/inputtext';

import { SharedModule } from './../shared/shared.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';

export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:8090'],
        blacklistedRoutes: ['http://localhost:8090/oauth/token']
      }
    }),
    InputTextModule,
    ButtonModule,
    SharedModule,

    SegurancaRoutingModule
  ],
  declarations: [
    LoginFormComponent
  ],
  providers: [
    JwtHelperService
  ]
})
export class SegurancaModule { }
