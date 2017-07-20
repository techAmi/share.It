import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignoutComponent } from './components/signout/signout.component';
import { AboutComponent } from './components/about/about.component';
import { LenderComponent } from './components/lender/lender.component';
import { FaqComponent } from './components/faq/faq.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AddItemComponent } from './components/addItem/addItem.component';
import { UploadSuccessfullComponent } from './components/addItem/upload-successfull.component';
import { MyItemsComponent } from './components/myItems/my-items.component';
import { UserDetailsComponent } from './components/userDetails/user-details.component';
import { ItemComponent } from './components/items/item.component';
import { IncomingRequestComponent } from './components/requests/incoming-request.component';
import { OutcomingRequestComponent } from './components/requests/outcoming-request.component';
import { RequestsComponent } from './components/requests/requests.component';
import { ChatRoomComponent } from './components/messages/chatRoom/chat-room.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { BorrowedItemsComponent } from './components/borrowedItems/borrowed-items.component';
import { LentItemsComponent } from './components/lentItems/lent-items.component';


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
    },

    {
        path: 'messages',
        component: MessagesComponent
    },

    {
        path: 'addItem',
        component: AddItemComponent
    },
    {
        path: 'upload-successfull',
        component: UploadSuccessfullComponent
    },
    {
        path: 'my-items',
        component: MyItemsComponent
    },
    {
        path: 'items/:id',
        component: ItemComponent
    },

    {
        path: 'user/:id',
        component: UserDetailsComponent
    },
    {
        path: 'incomingRequests/:id',
        component: IncomingRequestComponent
    },
    {
        path: 'outcomingRequests/:id',
        component: OutcomingRequestComponent
    },

    {
        path: 'requests',
        component: RequestsComponent
    },

    {
        path: 'messages/chatRoom/:id',
        component: ChatRoomComponent
    },

    {
        path: 'reviews',
        component: ReviewsComponent
    },

    {
        path: 'borrowedItems',
        component: BorrowedItemsComponent
    },

    {
        path: 'lentItems',
        component: LentItemsComponent
    }


];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRouters);


