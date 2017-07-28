import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

import { Request } from '../../models/request';

@Component({
  moduleId: module.id,
  templateUrl: './outcoming-request.component.html',
  styleUrls: ['./outcoming-request.component.css']
})

export class OutcomingRequestComponent implements OnInit {
  public request: Request;
  public isDeclinedRequestModalShown = false;
  public isAcceptedRequestModalShown = false;
  public isOpenRequestModalShown = false;
  public hideMessageBtn = false;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _firebaseService: FirebaseService) {
      this.isDeclinedRequestModalShown = true;
      this.isAcceptedRequestModalShown = true;
      this.isOpenRequestModalShown = true;
      this.hideMessageBtn = true;
  }

  ngOnInit() {
    console.log('route params ', this._route.params);
    this._route.params.map(params => params['id'])
    .subscribe( id => {
      this._firebaseService.getRequests()
      .subscribe(requests => {
        requests.forEach(element => {
          if (element.$key === id) {
            this.request = element;
          }
        });
      });
    });
  }
  hideModal() {
    this.isDeclinedRequestModalShown = false;
    this._router.navigate(['requests']);
  }
  searchItem(searchWord: string) {
    this._router.navigate(['search/' + searchWord]);
  }

  deleteRequest(request: Request) {
    this._firebaseService.deleteRequest(request);
    this._router.navigate(['requests']);
  }
  messageBtnclicked() {
    this.hideMessageBtn = false;
  }

  goToUser() {
    this._router.navigate(['user/' + this.request.requestedItem.itemOwner.userUid]);
  }
}
