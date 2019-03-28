import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { test } from '../pages/Test/test';
import { LoginPage } from '../pages/Login/login';
import { WelcomePage } from '../pages/Welcome/welcome';
import { CategoriaPage } from '../pages/categoria/categoria';
import { RegistrarPage } from '../pages/registrar/registrar';
import { JugarPage } from '../pages/jugar/jugar';
import { ResultPage} from '../pages/result/result';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Entorno } from '../models/urlconfig';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { MapaPage } from '../pages/mapa/mapa';
import { Geolocation } from '@ionic-native/geolocation';


@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    test,
    LoginPage,
    WelcomePage,
    CategoriaPage,
    RegistrarPage,
    JugarPage,
    ResultPage,
    MapaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
     IonicModule.forRoot(MyApp),
     HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    test,
    LoginPage,
    WelcomePage,
    CategoriaPage,
    RegistrarPage,
    JugarPage,
    ResultPage,
    MapaPage
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Entorno,
    Geolocation
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
