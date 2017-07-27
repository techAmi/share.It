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
        console.log(this.category);
      });
    this.branche = this._dataService.category;
    console.log('got branche via service ', this.branche.background);

  }
  ngOnInit() {
    this._firebaseService.getItemsByBranche(this.branche.name)
      .subscribe(items => {
        this.items = items;
        console.log('item filtered for this category', this.items);
      });
  }
}
