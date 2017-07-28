import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { Request } from '../../models/request';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  moduleId: module.id,
  templateUrl: './incoming-request.component.html',
  styleUrls: ['./incoming-request.component.css']
})

export class IncomingRequestComponent implements OnInit {

  public request: Request;
  public isCollapsed = true;
  public msgVal = '';
  public requestStatus = 2; // declined by default
  public showAlert = false;
  @ViewChild('acceptedRequestModal') public acceptedRequestModal: ModalDirective;
  public isAcceptedRequestModalShown = false;
  public isDeclinedRequestModalShown = false;
  public hideMessageBtn = true;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _firebaseService: FirebaseService
  ) {
    this.isAcceptedRequestModalShown = true;
    this.isDeclinedRequestModalShown = true;
  }

  ngOnInit() {
    this._route.params.map(params => params['id'])
    .subscribe( id => {
      this._firebaseService.getRequests()
      .subscribe( requests => {
        requests.forEach( request => {
          if (request.$key === id) {
            this.request = request;
          }
        })
      })
    });
    console.log('request ', this.request);
  }

  declineRequest() {
    console.log('decline button was clicked');
    this.request.status = 2; // requeest declined
    this._firebaseService.updateRequest(this.request.$key, this.request);
  }

  acceptRequest() {
    this.request.status = 3; // request accepted
    this._firebaseService.updateRequest(this.request.$key, this.request);
    // TODO: close the modal after a successfull operation
  }

  hideAcceptedRequestModal() {
    this.isAcceptedRequestModalShown = false;
    this._router.navigate(['requests'])
  }

  messageBtnClicked() {
    this.hideMessageBtn = false; // if the button was clicked hide msg button
  }

  sendMessage(msg: string) {
    console.log('message to send ', msg);
    this._firebaseService.appendMessage(msg, this.request.requestFrom);
    this.msgVal = '';
  }

  cancelBtnClicked() {
    this._router.navigate(['requests']);
  }
  changeStatus() {
    console.log('the status ', this.requestStatus);
    if (this.requestStatus == 2) {
      return;
    } else if (this.requestStatus == 3 || this.requestStatus == 0) {
      this.request.status = Number(this.requestStatus);
      this._firebaseService.updateRequest(this.request.$key, this.request);
      this._router.navigate(['requests']);
    }
    console.log('request after update', this.request);
  }





}
