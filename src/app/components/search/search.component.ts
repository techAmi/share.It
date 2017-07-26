import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { FirebaseService } from '../../services/firebase.service';

import { Item } from '../../models/item';

@Component({
  moduleId: module.id,
  templateUrl: 'search.component.html',
  styleUrls: [ 'search.component.css']
})

export class SearchComponent implements OnInit {
  private searchTerm;
  public searchedItems: Item[];
  constructor (
    private _firebaseService: FirebaseService,
    private _route: ActivatedRoute
  ) {

     }
  ngOnInit() {

    this._route.params.map(params => params['keyword'])
                    .subscribe(keyword => {
                      this._firebaseService.searchItems(keyword)
                      .subscribe(items => {
                        this.searchedItems = items;
                        console.log('item found ', this.searchedItems)
                      })
                    });
  }

  searchItem(searchWord: string)  {
    console.log('the search word ', searchWord);
    this._firebaseService.searchItems(searchWord)
    .subscribe(items => {
      this.searchedItems = items;
    })
  }
}
