import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  constructor (private as: AuthService) {

  }
  loginWithGoogle() {
    this.as.loginWithGoogle();
  }

  loginWithFacebook() {
    this.as.loginWithFacebook();
  }

  loginWithTwitter() {
    this.as.loginWithTwitter();
  }
}
