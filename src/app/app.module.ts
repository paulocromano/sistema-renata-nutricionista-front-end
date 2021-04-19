import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { LoginModule } from './login/login.module';
import { PaginaInicialModule } from './pagina-inicial/pagina-inicial.module';
import { ToastyModule } from './shared/toasty/toasty.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    PaginaInicialModule,
    ToastyModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
