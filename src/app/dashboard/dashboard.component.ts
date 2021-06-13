import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './../shared/service/authentication.service';
import { TokenService } from './../shared/service/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  public usuarioEstaLogado: boolean = false;
  public nomeUsuario: string;
  public show: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private tokenService: TokenService,
    private router: Router
    ) { }

  ngOnInit(): void { 
    this.usuarioEstaLogado = new Boolean(this.tokenService.getPermissoes()).valueOf();
    this.nomeUsuario = this.tokenService.jwtPayload?.nome.split('/')[0];
  }

  public efetuarLogout(): void {
    this.authenticationService.logout()
      .subscribe(() => {
        this.usuarioEstaLogado = false;
        this.nomeUsuario = null;
        this.tokenService.apagarToken();
        this.router.navigate(['/login']);
      });
  }
}
