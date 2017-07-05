import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private isLoggedIn: Boolean;
  public user_email: string;
  public user_displayName: string;

  constructor (private as: AuthService) {}
  ngOnInit() {
    if (this.as.getUserInformation() != null) {
      this.user_email = this.as.getUserInformation().email;
      this.user_displayName = this.as.getUserInformation().displayName;
    } else {
      this.user_displayName = 'none';
    }
  }
}

