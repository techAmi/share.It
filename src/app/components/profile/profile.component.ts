import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  moduleId: module.id,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
  public userDisplayName: string;
  public profileImageUrl: string;

  constructor( private _firebaseService: FirebaseService) {
    if (this._firebaseService.getCurrentUser()) {
      this.userDisplayName = this._firebaseService.getCurrentUser().displayName;
      this.profileImageUrl = this._firebaseService.getCurrentUser().photoUrl;
    } else {
      this.userDisplayName = 'none';
    }
  }
}
