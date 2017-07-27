import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { DataSharingService } from '../../services/data-sharing.service';
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
    private _firebaseService: FirebaseService,
    private _dataService: DataSharingService
   ) {
    if (this.as.getUserInformation() != null) {
      this.isLoggedIn = this.as.getUserInformation().isLoggedIn;
      this.userDisplayName = this.as.getUserInformation().displayName.split(' ')[0];
    }
    this.branches = [];
    this.recentlyAddedItems = [];
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
    // if the user is logged in delete user items from the recently added items list
    if (this._firebaseService.getCurrentUser()) {
      this.recentlyAddedItems = this._firebaseService.filterRecentlyAddedItems();
    } else {
      this._firebaseService.getRecentlyAddedItems().subscribe( items => {
        this.recentlyAddedItems = items;
      });
    }
    this._dataService.branches = this.branches;
  }
  brancheClick(branche) {
    console.log('branche was clicked', branche);
    this._dataService.category = branche;
  }
}
