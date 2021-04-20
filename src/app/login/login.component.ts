import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { CredenciaisUsuario } from './shared/model/credenciais-usuario.model';
import { ToastyComponent } from './../shared/toasty/toasty.component';
import { AuthenticationService } from './../shared/service/authentication.service';
import { TokenService } from './../shared/service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  public credenciaisUsuario: CredenciaisUsuario = new CredenciaisUsuario();

  constructor(
    private authenticationService: AuthenticationService,
    private tokenService: TokenService,
    private router: Router
    ) { }

  ngOnInit(): void {

  }

  public efetuarLogin(): void {
    this.authenticationService.autenticarUsuario(this.credenciaisUsuario)
      .subscribe((response: any) => {
        this.tokenService.armazenarToken(response);
        this.credenciaisUsuario = new CredenciaisUsuario();
        this.router.navigate(['inicio']);
      },
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.toasty.error('Email ou senha inválidos!');
          }
        }
      );
  }

  public desabilitarBotaoEntrar(): boolean {
    return !(this.credenciaisUsuario.email && this.credenciaisUsuario.senha) 
      || this.credenciaisUsuario.senha.length < 6; 
  }
}
