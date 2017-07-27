import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  @ViewChild('autoShownModal') public autoShowModal: ModalDirective;

  public isModalShown = false;
  constructor (
    private as: AuthService,
    private _router: Router) {
    this.isModalShown = true;

  }

  public hideModal(): void {
    this.autoShowModal.hide();
    this._router.navigate(['']);
  }

  public onHidden() {
    this.isModalShown = false;
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
