import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServidorService {
  
  private urlServidorFrontEnd: string = 'http://127.0.0.1:4200' 
  private urlServidorBackEnd: string = 'http://localhost:8080';

  public regraAcessoFuncionario: string = 'ROLE_FUNCIONARIO';
  public regraAcessoAdmin: string = 'ROLE_ADMIN';

  public urlFrontAcessoNegado: string = this.urlServidorFrontEnd + '/login';

  constructor() { }


  public getServidorBackEnd(): string {
    return this.urlServidorBackEnd;
  }
}
