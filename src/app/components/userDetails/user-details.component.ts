import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { Item } from '../../models/item';
import { FirebaseService } from '../../services/firebase.service';
@Component({
    moduleId: module.id,
    templateUrl: 'user-details.component.html',
    styleUrls: ['user-details.component.css']
})

export class UserDetailsComponent {
    user: User;
    items: Item[];
    msgVal = '';
    constructor (
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
    }

    sendMessage(msg: string) {
        console.log('message to send ', msg);
        this._firebaseService.appendMessage(msg, this.user);
        this.msgVal = '';

    }
}
