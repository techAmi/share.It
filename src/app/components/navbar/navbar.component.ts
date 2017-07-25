import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { GlobalEventsManagerService } from '../../services/global.event.manager.service';
@Component({
  moduleId: module.id,
  selector: 'app-nav-bar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})
export class NavbarComponent {
  public isLoggedIn: boolean;
  public profilePhotoUrl: string;
  public switchNavbar = false;
  constructor (
    private as: AuthService,
    private _firebaseService: FirebaseService,
    private globalEventManager: GlobalEventsManagerService
  ) {
    this.globalEventManager.switchNavBarEmitter.subscribe((mode) => {
      if (mode !== null ) {
        this.switchNavbar = mode;
      }
      if (this._firebaseService.getCurrentUser() != null) {
      this.profilePhotoUrl = this._firebaseService.getCurrentUser().photoUrl;
      console.log(this.profilePhotoUrl);
    }
    });
  }

}
