import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule} from 'angularfire2';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';
import { LenderComponent } from './lender/lender.component';
import { AboutComponent } from './about/about.component';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './services/auth.service';


import { routing } from './app.routing';

export const firebaseConfig = {
    apiKey: 'AIzaSyCU-xOnnDt8Elsbz_3whNAEzcS-BusKTks',
    authDomain: 'shareit-1cdda.firebaseapp.com',
    databaseURL: 'https://shareit-1cdda.firebaseio.com',
    storageBucket: 'shareit-1cdda.appspot.com',
    messagingSenderId: '258962822944'
  };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LenderComponent,
    AboutComponent,
    FaqComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    AuthService,
    AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
