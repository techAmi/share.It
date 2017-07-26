import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AuthService } from '../../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  @ViewChild('autoShowModal') public autoShowModal: ModalDirective;

  public isModalShown = false;
  constructor (private as: AuthService) {
    this.isModalShown = true;
  }

  public hideModal(): void {
    this.autoShowModal.hide();
  }

  public onHidden() {
    this.isModalShown = false;
  }
  loginWithGoogle() {
    console.log('login with google btn clicked');
    this.as.loginWithGoogle();
  }

  loginWithFacebook() {
    this.as.loginWithFacebook();
  }

  loginWithTwitter() {
    this.as.loginWithTwitter();
  }
  loginBtnClick(){
    console.log('login btn was clicked');
  }
}
