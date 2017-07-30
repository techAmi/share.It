import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

import { Request } from '../../models/request';


@Component({
  moduleId: module.id,
  selector: 'app-requests',
  templateUrl: 'requests.component.html',
  styleUrls: ['requests.component.css']

})

export class RequestsComponent {
  public requests: Request[];
  public filteredRequests: {
    incomingRequests: Request[],
    outcomingRequests: Request[]};

  constructor(private _firebaseService: FirebaseService) {
    this._firebaseService.getRequests().
    subscribe(requests => {
      this.requests = requests;
    })
    this.filteredRequests = this._firebaseService.filterRequests();
  }
}
