import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';

import { Category } from '../../models/category';
import { Item } from '../../models/item';
import { Branche } from '../../models/branche';
@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
  public userDisplayName: string;
  public isLoggedIn = false;

  public categories: Category[];
  public recentlyAddedItems: Item[];
  public branches: Branche[];

  constructor(
    private as: AuthService,
    private _firebaseService: FirebaseService
   ) {
    if (this.as.getUserInformation() != null) {
      this.isLoggedIn = this.as.getUserInformation().isLoggedIn;
      this.userDisplayName = this.as.getUserInformation().displayName.split(' ')[0];
    }
    this.branches = [];
  }

  ngOnInit() {
    this._firebaseService.getCategories().subscribe( categories => {
      this.categories = categories;
      console.log (this.categories);
      this.categories.forEach( category => {
        if (category.branches) {
          console.log(category.branches);
          category.branches.forEach( branche => {
          this.branches.push(branche);
          })
      }
    });
    });
    console.log(this.branches);
    this._firebaseService.getRecentlyAddedItems().subscribe( items => {
      this.recentlyAddedItems = items;
    })
  }
}
