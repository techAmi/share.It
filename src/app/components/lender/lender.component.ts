import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  moduleId: module.id,
  selector: 'app-lender',
  templateUrl: 'lender.component.html',
  styleUrls: ['lender.component.css']
})
export class LenderComponent implements OnInit {

  constructor(private _as: AuthService) {

  }

  ngOnInit() {
    console.log('current user', this._as.getCurrentUser());
    console.log('user information ', this._as.getUserInformation());
  }
}
