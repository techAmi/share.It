import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Item } from '../../models/item';

@Component({
  moduleId: module.id,
  templateUrl: 'my-items.component.html',
  styleUrls: ['my-items.component.css']
})

export class MyItemsComponent implements OnInit {

  public items: Item[];
  constructor (private _fb: FirebaseService) {

  }

  ngOnInit() {
    this._fb.getItems().subscribe(items => {
      this.items = items;
      console.log(items);
    });
  }
  editItem(item: Item) {
    console.log('will edit this item: ', item);
  }
}
