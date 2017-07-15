import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Item } from '../models/item';
import { Category } from '../models/category';
import { Condition } from '../models/condition';
import * as firebase from 'firebase';

@Injectable()

export class FirebaseService {
  items: FirebaseListObservable<Item[]>;
  categories: FirebaseListObservable<Category[]>;
  conditions: FirebaseListObservable<Condition[]>;

  constructor(private _db: AngularFireDatabase) {
    this.items = this._db.list('/items') as
    FirebaseListObservable<Item[]>;
  }
  getItems () {
    this.items = this._db.list('/items') as
    FirebaseListObservable<Item[]>
    return this.items;
  }

  getItem($key: string) {
    let item: Item;
    this.items.subscribe(items => {
      for (const entry of items ){
        if (entry.$key === $key) {
          item = entry;
        }
      }
    });
    console.log(item);
    return item;
  }

  getCategories() {
    this.categories = this._db.list('/categories') as
    FirebaseListObservable<Category[]>;
    return this.categories;
  }

  getConditions() {
    this.conditions = this._db.list('/Conditions') as
    FirebaseListObservable<Condition[]>;
    return this.conditions;
  }

  addItem(item: Item) {
    console.log('will add a new item', item);
    item.createAt = firebase.database.ServerValue.TIMESTAMP;
    return this.items.push(item);

  }

  getRecentlyAddedItems() {
    this.items = this._db.list('/items', {
      query: {
        orderByChild: 'createAt',
        limitToLast: 10
      }
    }) as
    FirebaseListObservable<Item[]>;

    return this.items;
  }

  updateItem(key: string, updItem: Item) {
    updItem.createAt = firebase.database.ServerValue.TIMESTAMP;
    return this.items.update(key, updItem);
  }
  deleteItem(key: string) {
    return this.items.remove(key);
  }
}

