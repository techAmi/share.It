import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Item } from '../../models/item';

@Component({
    moduleId: module.id,
    templateUrl: 'item.component.html',
    styleUrls: ['item.component.css']
})

export class ItemComponent implements OnInit {

    public item: Item;
    private key: string;
    constructor(
        private _firebaseService: FirebaseService,
        private _route: ActivatedRoute) {
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

    }
}
