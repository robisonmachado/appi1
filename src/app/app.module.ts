import { ApiAccessModule } from './../providers/api-access/api-access.module';
import { ResultadoPesquisaPageModule } from './../pages/resultado-pesquisa/resultado-pesquisa.module';
import { SlidePageModule } from './../pages/slide/slide.module';
import { PesquisarPageModule } from './../pages/pesquisar/pesquisar.module';
import { ContatoPageModule } from './../pages/contato/contato.module';
import { IntroPageModule } from './../pages/intro/intro.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';
import { ResultadoPesquisaPage } from '../pages/resultado-pesquisa/resultado-pesquisa';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    IntroPageModule,
    ContatoPageModule,
    PesquisarPageModule,
    ResultadoPesquisaPageModule,
    SlidePageModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    MaterializeModule,
    BrowserAnimationsModule,
    ApiAccessModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {
  public static title:string = 'essaude';

}
