import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from 'primeng/toast';

import { ToastyComponent } from './toasty.component';

@NgModule({
  declarations: [ ToastyComponent ],
  imports: [
    CommonModule,
    ToastModule
  ],
  exports: [ ToastyComponent ]
})

export class ToastyModule { }
