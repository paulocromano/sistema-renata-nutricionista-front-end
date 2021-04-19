import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { LoginService } from './shared/service/login.service';
import { CredenciaisUsuario } from './shared/model/credenciais-usuario.model';
import { ToastyComponent } from './../shared/toasty/toasty.component';

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
    private loginService: LoginService,
    private router: Router
    ) { }

  ngOnInit(): void {

  }

  public efetuarLogin(): void {
    this.loginService.efetuarLoginUsuario(this.credenciaisUsuario)
      .subscribe(() => {
        this.credenciaisUsuario = new CredenciaisUsuario();
        this.router.navigate(['inicio']);
      },
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.toasty.error('Email ou senha inválidos!');
          }
          
          console.log(error)
        }
      );
  }

  public desabilitarBotaoEntrar(): boolean {
    return !(this.credenciaisUsuario.email && this.credenciaisUsuario.senha) 
      || this.credenciaisUsuario.senha.length < 6; 
  }
}
