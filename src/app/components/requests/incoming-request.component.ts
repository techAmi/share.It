import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { Request } from '../../models/request';

@Component({
  moduleId: module.id,
  templateUrl: './incoming-request.component.html',
  styleUrls: ['./incoming-request.component.css']
})

export class IncomingRequestComponent implements OnInit {

  public request: Request;
  public isCollapsed = true;
  constructor(
    private _route: ActivatedRoute,
    private _firebaseService: FirebaseService
  ) {

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
}
