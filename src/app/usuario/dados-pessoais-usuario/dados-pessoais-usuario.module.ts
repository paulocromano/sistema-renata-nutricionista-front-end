import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { DadosPessoaisUsuarioComponent } from './dados-pessoais-usuario.component';
import { ToastyModule } from './../../shared/toasty/toasty.module';

@NgModule({
  declarations: [ DadosPessoaisUsuarioComponent ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    DialogModule,
    PasswordModule,
    ProgressSpinnerModule,
    ToastyModule
  ],
  exports: [ DadosPessoaisUsuarioComponent ]
})

export class DadosPessoaisUsuarioModule { }
