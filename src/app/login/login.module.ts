import { ToastyModule } from './../shared/toasty/toasty.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';

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
