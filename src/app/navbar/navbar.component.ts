import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  moduleId: module.id,
  selector: 'app-nav-bar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent {
  constructor (private as: AuthService) {}

  logout() {
    this.as.logout();
  }
}
