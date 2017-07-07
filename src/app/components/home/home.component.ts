import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {
  public userDisplayName: string;
  public isLoggedIn = false;
  constructor(private as: AuthService ) {
    if (this.as.getUserInformation() != null) {
      this.isLoggedIn = this.as.getUserInformation().isLoggedIn;
      this.userDisplayName = this.as.getUserInformation().displayName.split(' ')[0];
    }
  }
}
