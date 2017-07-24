import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  moduleId: module.id,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
  public userDisplayName: string;
  public profileImageUrl: string;

  constructor( private _as: AuthService) {
    if (this._as.getUserInformation()) {
      this.userDisplayName = this._as.getUserInformation().displayName;
      this.profileImageUrl = this._as.getUserInformation().photoUrl;
    } else {
      this.userDisplayName = 'none';
    }
  }
}
