import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private isLoggedIn: boolean;
  public userEmail: string;
  public userDisplayName: string;

  constructor (
    private as: AuthService,
    private router: Router ) {}
  ngOnInit() {
    if (this.as.getUserInformation() != null) {
      this.userEmail = this.as.getUserInformation().email;
      this.userDisplayName = this.as.getUserInformation().displayName;
      this.isLoggedIn = this.as.getUserInformation().isLoggedIn;
    } else {
      this.userDisplayName = 'none';
      this.isLoggedIn = false;
    }
    console.log(this.as.authenticate());
  }

  signout() {
    if (this.isLoggedIn) {
      this.as.logout();
      this.isLoggedIn = false;
      console.log(this.as.authenticate());
    } else {
      console.log('you are not logged out, login first');
    }
  }
}

