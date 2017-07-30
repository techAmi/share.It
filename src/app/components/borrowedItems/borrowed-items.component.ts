import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';
import { Item } from '../../models/item';

@Component({
  moduleId: module.id,
  templateUrl: './borrowed-items.component.html',
  styleUrls: ['./borrowed-items.component.css']
})

export class BorrowedItemsComponent {

  public borrowedItems: Item[];
  constructor(
    private _firebaseService: FirebaseService,
    private _authService: AuthService) {

    let userUid: string;
    userUid = this._authService.getUserInformation().userUid;
    this.borrowedItems = this._firebaseService.getBorrowedItems(userUid);
  }
}
