import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  private isLoggedIn: boolean;
  public userEmail: string;
  public userDisplayName: string;
  private userId: string;
  public myItemsCount = 0;
  public borrowedItemsCount = 0;
  public lentItemsCount = 0;
  public reviewsCount = 0;
  constructor (
    private as: AuthService,
    private router: Router,
    private _firebaseService: FirebaseService
   ) {
    this.userId = this.as.getUserInformation().userUid;
   }
  ngOnInit() {
    this.myItemsCount = this._firebaseService.myItemsCount;
  }

}

