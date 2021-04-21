import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';

import { LoginComponent } from './login.component';
import { ToastyModule } from './../shared/toasty/toasty.module';


@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    InputTextModule,
    ToastyModule
  ]
})
export class LoginModule { }
