import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  moduleId: module.id,
  selector: 'app-signout',
  templateUrl: 'signout.component.html',
  styleUrls: ['signout.component.css']
})
export class SignoutComponent {
  constructor (private as: AuthService) {}

  logout() {
    this.as.logout();
  }
}
