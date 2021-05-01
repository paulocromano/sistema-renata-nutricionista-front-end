import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptorService } from './token-interceptor.service';
import { ServidorInterceptorService } from './servidor-interceptor.service';
import { TokenInvalidoInterceptorService } from './token-invalido-interceptor.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServidorInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInvalidoInterceptorService,
      multi: true
    }
  ]
})

export class InterceptorModule { }
