import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-signout',
  templateUrl: 'signout.component.html',
  styleUrls: ['signout.component.css']
})
export class SignoutComponent {

  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;

  public isModalShown = false;
  private currentUrl: any;
  constructor (
    private as: AuthService,
    private _router: Router) {
    this.isModalShown = true;
  }

  public hideModal(): void {
    this.autoShownModal.hide();
    this._router.navigate(['']);
    // Todo: save the url before this component is called
    // to go back to the same page where the user left
  }

  public onHidden(): void {
    this.isModalShown = false;
  }
  logout() {
    this.as.logout();
  }
}
