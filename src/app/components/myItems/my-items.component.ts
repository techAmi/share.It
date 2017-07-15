import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';

import { Item } from '../../models/item';

@Component({
  moduleId: module.id,
  templateUrl: 'my-items.component.html',
  styleUrls: ['my-items.component.css']
})

export class MyItemsComponent implements OnInit {

  public myItems: Item[];
  private userId: string;
  constructor (
    private _fb: FirebaseService,
    private _as: AuthService) {
      this.userId = this._as.getUserInformation().userUid;
      this.myItems = this._fb.getMyItems(this.userId);
      console.log('?????? my items', this.myItems);
  }

  ngOnInit() {
  }
  editItem(item: Item) {
    console.log('will edit this item: ', item);
  }
}
