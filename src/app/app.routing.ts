import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignoutComponent } from './signout/signout.component';
import { AboutComponent } from './about/about.component';
import { LenderComponent } from './lender/lender.component';
import { FaqComponent } from './faq/faq.component';
import { DashboardComponent } from './dashboard/dashboard.component';




const appRouters: Routes = [
    {
        path: '',
        component: HomeComponent
    },

    {
        path: 'lender',
        component: LenderComponent
    },

    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'signout',
        component: SignoutComponent
    },


    {
        path: 'about',
        component: AboutComponent
    },

    {
        path: 'faq',
        component: FaqComponent
    },

    {
        path: 'dashboard',
        component: DashboardComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRouters);


