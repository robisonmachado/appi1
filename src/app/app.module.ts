import { SlidePageModule } from './../pages/slide/slide.module';
import { PesquisarPageModule } from './../pages/pesquisar/pesquisar.module';
import { ContatoPageModule } from './../pages/contato/contato.module';
import { IntroPageModule } from './../pages/intro/intro.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TokenProvider } from '../providers/token/token';

import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    IntroPageModule,
    ContatoPageModule,
    PesquisarPageModule,
    SlidePageModule,
    BrowserModule,
    HttpModule,
    MaterializeModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TokenProvider
  ]
})
export class AppModule {
  public static title:string = 'essaude';

}
