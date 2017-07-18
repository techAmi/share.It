import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule} from 'angularfire2';

import { AlertModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignoutComponent } from './components/signout/signout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FaqComponent } from './components/faq/faq.component';
import { LenderComponent } from './components/lender/lender.component';
import { UserDetailsComponent } from './components/userDetails/user-details.component';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AddItemComponent } from './components/addItem/addItem.component';
import { UploadSuccessfullComponent } from './components/addItem/upload-successfull.component';
import { MyItemsComponent } from './components/myItems/my-items.component';
import { EditItemComponent } from './components/editItem/edit-item.component';
import { ItemComponent } from './components/items/item.component';
import { IncomingRequestComponent } from './components/requests/incoming-request.component';
import { OutcomingRequestComponent } from './components/requests/outcoming-request.component';
import { RequestsComponent } from './components/requests/requests.component';

import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthService } from './services/auth.service';
import { FirebaseService } from './services/firebase.service';
import { GlobalEventsManagerService } from './services/global.event.manager.service';
import { UploadComponent } from './utils/image-upload.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { routing } from './app.routing';

import { MomentModule } from 'angular2-moment';

import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap';

import { DatePickerModule } from 'angular-io-datepicker/src/datepicker/index';
import { OverlayModule } from 'angular-io-overlay';
export const firebaseConfig = {
    apiKey: 'AIzaSyCU-xOnnDt8Elsbz_3whNAEzcS-BusKTks',
    authDomain: 'shareit-1cdda.firebaseapp.com',
    databaseURL: 'https://shareit-1cdda.firebaseio.com',
    projectId: 'shareit-1cdda',
    storageBucket: 'shareit-1cdda.appspot.com',
    messagingSenderId: '258962822944'
  };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignoutComponent,
    LenderComponent,
    AboutComponent,
    FaqComponent,
    NavbarComponent,
    DashboardComponent,
    MessagesComponent,
    AddItemComponent,
    UploadComponent,
    UploadSuccessfullComponent,
    MyItemsComponent,
    EditItemComponent,
    ItemComponent,
    UserDetailsComponent,
    IncomingRequestComponent,
    OutcomingRequestComponent,
    RequestsComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    MomentModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    CollapseModule.forRoot(),
    ReactiveFormsModule,
    OverlayModule,
    DatePickerModule,
    AngularFireDatabaseModule,

    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    AuthService,
    AngularFireAuth,
    FirebaseService,
    GlobalEventsManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
