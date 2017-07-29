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
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { SearchComponent } from './components/search/search.component';
import { CategoriesComponent } from './components/categories/categories.component';

const appRouters: Routes = [
    {
        path: '',
        component: HomeComponent
    },


    {
        path: 'lender',
        component: LenderComponent,
        data: {
            breadCrumb: 'Lender'
        }
    },

    {
        path: 'login',
        component: LoginComponent,
         data: {
            breadCrumb: 'Login'
        }
    },

    {
        path: 'signout',
        component: SignoutComponent,
         data: {
            breadCrumb: 'Logout'
        }
    },


    {
        path: 'about',
        component: AboutComponent,
         data: {
            breadCrumb: 'About'
        }
    },

    {
        path: 'faq',
        component: FaqComponent,
        data: {
            breadCrumb: 'FAQ'
        }
    },

    {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
            breadCrumb: 'Dashboard'
        }
    },

    {
        path: 'messages',
        component: MessagesComponent,
        data: {
            breadCrumb: 'Messages'
        }
    },

    {
        path: 'addItem',
        component: AddItemComponent,
        data: {
            breadCrumb: 'Add Item'
        }
    },
    {
        path: 'upload-successfull',
        component: UploadSuccessfullComponent,
         data: {
            breadCrumb: 'Add Item'
        }
    },
    {
        path: 'my-items',
        component: MyItemsComponent,
         data: {
            breadCrumb: 'My Items'
        }
    },
    {
        path: 'items/:id',
        component: ItemComponent,
         data: {
            breadCrumb: 'Items'
        }
    },

    {
        path: 'user/:id',
        component: UserDetailsComponent,
        data: {
            breadCrumb: 'User'
        }
    },
    {
        path: 'incomingRequests/:id',
        component: IncomingRequestComponent,
        data: {
            breadCrumb: 'Incoming Requests'
        }
    },
    {
        path: 'outcomingRequests/:id',
        component: OutcomingRequestComponent,
        data: {
            breadCrumb: 'Outcoming Requests'
        }
    },

    {
        path: 'requests',
        component: RequestsComponent,
        data: {
            breadCrumb: 'Requests'
        }
    },

    {
        path: 'messages/chatRoom/:id',
        component: ChatRoomComponent,
        data: {
            breadCrumb: 'Messages'
        }
    },

    {
        path: 'reviews',
        component: ReviewsComponent,
        data: {
            breadCrumb: 'Reviews'
        }
    },

    {
        path: 'borrowedItems',
        component: BorrowedItemsComponent,
        data: {
            breadCrumb: 'Borrowed Items'
        }
    },

    {
        path: 'lentItems',
        component: LentItemsComponent,
        data: {
            breadCrumb: 'Lent items'
        }
    },

    {
        path: 'profile',
        component: ProfileComponent,
        data: {
            breadCrumb: 'Profile'
        }
    },

    {
        path: 'edit-profile',
        component: EditProfileComponent,
        data: {
            breadCrumb: 'Profile'
        }
    },

    {
        path: 'search/:keyword',
        component: SearchComponent,
        data: {
            breadCrumb: 'Search'
        }
    },

    {
        path: 'categories/:category',
        component: CategoriesComponent,
        data: {
            breadCrumb: 'Categories'
        }
    }



];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRouters);


