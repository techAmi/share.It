import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Item } from '../../models/item';
import { Request } from '../../models/request';
import { User } from '../../models/user';

@Component({
    moduleId: module.id,
    templateUrl: 'item.component.html',
    styleUrls: ['item.component.css']
})

export class ItemComponent implements OnInit {

    public item: Item;
    private key: string;
    public itemRequestForm: FormGroup;
    private request: Request;
    private currentUser: User;
    constructor(
        private _firebaseService: FirebaseService,
        private _as: AuthService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _fb: FormBuilder) {
            _route.params
                    .map(params => params['id'])
                    .subscribe( id => {
                        this.key = id;
                    });
        this._firebaseService.getItems().subscribe(items => {
            for (const entry of items){
                if (entry.$key === this.key) {
                    this.item = entry;
                }
            }
        });
    }

    ngOnInit() {
        this.currentUser = this._as.getUserInformation();
        this.itemRequestForm = this._fb.group({
            requestStarts: new FormControl('', Validators.required ),
            requestEnds: new FormControl('', Validators.required),
            message: new FormControl('')
        });
    }

    sendRequest() {
        this.request = {
            requestFrom: this.currentUser,
            requestedItem: this.item,
            requestStarts: this.itemRequestForm.controls['requestStarts'].value.toJSON(),
            requestEnds: this.itemRequestForm.controls['requestEnds'].value.toJSON(),
            message: this.itemRequestForm.controls['message'].value,
            status: 0

        }
        if (this.currentUser) {
            this._firebaseService.appendRequest(this.request);
            this._router.navigate(['/dashboard']);
        } else {
            this._router.navigate(['/login']);
        }
        console.log('request to send ', this.itemRequestForm);
        console.log('request made ', this.request);
        console.log('send request button was clicked');

    }
}