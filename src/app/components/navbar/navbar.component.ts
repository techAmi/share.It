import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {GlobalEventsManagerService } from '../../services/global.event.manager.service';
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
    private globalEventManager: GlobalEventsManagerService
  ) {
    this.globalEventManager.switchNavBarEmitter.subscribe((mode) => {
      if (mode !== null ) {
        this.switchNavbar = mode;
      }
      if (this.as.getUserInformation() != null) {
      this.profilePhotoUrl = this.as.getUserInformation().photoUrl;
      console.log(this.profilePhotoUrl);
    }
    });
  }

}
