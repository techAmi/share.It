import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Item } from '../../models/item';



@Component({
  moduleId: module.id,
  templateUrl: './lent-items.component.html',
  styleUrls: ['./lent-items.component.css']
})

export class LentItemsComponent {
  private userUid: string;
  public lentItems: Item[];
  constructor(
    private _firebaseService: FirebaseService
  ) {
    this.userUid = this._firebaseService.getCurrentUser().userUid;
    this.lentItems = this._firebaseService.getLentItems(this.userUid);
  }
}
