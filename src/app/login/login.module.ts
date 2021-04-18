import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {InputTextModule} from 'primeng/inputtext';

import { LoginComponent } from './login.component';

@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    CommonModule,
    InputTextModule
  ]
})
export class LoginModule { }
