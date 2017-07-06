import { NgModule } from '@angular/core';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignoutComponent } from './signout/signout.component';
import { LenderComponent } from './lender/lender.component';
import { FaqComponent } from './faq/faq.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    SignoutComponent,
    LenderComponent,
    AboutComponent,
    FaqComponent,
    NavbarComponent,
    DashboardComponent
  ],
  imports: [
  ],
  providers: [
    ],
  bootstrap: []
})
export class ComponentsModule { }
