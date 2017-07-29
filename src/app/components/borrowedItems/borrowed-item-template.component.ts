import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../../models/item';

@Component({
    moduleId: module.id,
    selector: 'borrowed-item',
    templateUrl: 'borrowed-item-template.component.html',
    styleUrls: ['borrowed-item-template.component.css']
})

export class BorrowedItemComponent implements OnInit {
    @Input() item: Item;
    constructor(private _router: Router) {
    }

    ngOnInit() {
        console.log(this.item);
    }

    toUser() {
        this._router.navigate(['user/' + this.item.itemOwner.userUid]);
    }

    borrowAgain() {
        console.log('url', 'items/' + this.item.$key);
        this._router.navigate(['items/' + this.item.$key]);
    }
}
