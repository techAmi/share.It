import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSharingService } from '../../services/data-sharing.service';
import { FirebaseService } from '../../services/firebase.service';
import { Item } from '../../models/item';

@Component({
  moduleId: module.id,
  templateUrl: 'categories.component.html',
  styleUrls: ['categories.component.css']
})

export class CategoriesComponent implements OnInit {
  public category: string;
  public branche: any;
  public items: Item[];

  constructor(
    private _route: ActivatedRoute,
    private _dataService: DataSharingService,
    private _firebaseService: FirebaseService) {

    this._route.params.map(params => params['category'])
      .subscribe(category => {
        this.category = category;
      });
    this.branche = this._dataService.category;

  }
  ngOnInit() {
    this._firebaseService.getItemsByBranche(this.branche.name)
      .subscribe(items => {
        this.items = items;
      });
  }
}
