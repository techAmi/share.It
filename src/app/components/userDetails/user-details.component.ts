import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Item } from '../../models/item';
import { FirebaseService } from '../../services/firebase.service';
@Component({
    moduleId: module.id,
    templateUrl: 'user-details.component.html',
    styleUrls: ['user-details.component.css']
})

export class UserDetailsComponent {
    public collapse = false;
    user: User;
    items: Item[];
    msgVal = '';
    isLoggedIn = false;
    hideMessageBtn = true;
    constructor (
        private _as: AuthService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _firebaseService: FirebaseService) {
            this.items = [];
            _route.params
                .map(params => params['id']).subscribe( id => {
                    this._firebaseService.getUsers().subscribe(users => {
                        users.forEach(user => {
                            if (user.userUid === id) {
                                this.user = user;
                            }
                        })
                    });
                    this._firebaseService.getItems().subscribe(items => {
                        items.forEach(item => {
                            if (item.itemOwner.userUid === id) {
                                this.items.push(item);
                            }
                        })
                    });
                });
            if (this._as.getUserInformation()) {
                this.isLoggedIn = this._as.getUserInformation().isLoggedIn;
            } else {
                 this.isLoggedIn = true;
                }
    }

    sendMessage(msg: string) {
        this._firebaseService.appendMessage(msg, this.user);
        this.msgVal = '';

    }
    messageBtnClicked() {
        // check if user is logged in before sending message
        // user is not logged in
        if (!this._as.getUserInformation()) {
            this._router.navigate(['login']);
        } else {
            this.hideMessageBtn = false; // if the button was clicked and user is logged in hide msg button
        }
    }
}
