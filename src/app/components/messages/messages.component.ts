import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

import { Request } from '../../models/request';


@Component({
  moduleId: module.id,
  selector: 'app-messages',
  templateUrl: 'messages.component.html',
  styleUrls: ['messages.component.css']

})

export class MessagesComponent {
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
    console.log('requests made to me ', this.filteredRequests )
  }
}
