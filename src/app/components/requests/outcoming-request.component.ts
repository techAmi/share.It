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

  constructor(
    private _route: ActivatedRoute,
    private _firebaseService: FirebaseService) {
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
}
