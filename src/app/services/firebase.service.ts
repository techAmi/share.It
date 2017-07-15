import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Item } from '../models/item';
import { User } from '../models/user';
import { Category } from '../models/category';
import { Condition } from '../models/condition';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';

@Injectable()

export class FirebaseService {
  items: FirebaseListObservable<Item[]>;
  myItems: Item[];
  recentlyAddedItems: FirebaseListObservable<Item[]>;
  categories: FirebaseListObservable<Category[]>;
  conditions: FirebaseListObservable<Condition[]>;
  public myItemsCount = 0;
  private user: User;
  private item: Item;

  constructor(
    private _db: AngularFireDatabase,
    private _as: AuthService) {

      this.items = this._db.list('/items') as
      FirebaseListObservable<Item[]>;
      this.myItems = [];


  }
  getItems () {
    this.items = this._db.list('/items') as
    FirebaseListObservable<Item[]>;
    return this.items;
  }

  getItem($key: string) {
    let item: Item;
    this.getItems().subscribe(items => {
      for (const entry of items) {
        if (entry.$key === $key) {
          item = entry;
        }
      }
    });
    return item;
  }


  getMyItems(userId: string) {
    this.myItems = [];
    console.log('current user ', userId);
    this.items.subscribe(items => {
      for (const entry of items) {
        console.log('item: ', entry);
        if (entry.itemOwner.userUid === userId) {
          this.myItemsCount++;
          this.myItems.push(entry);
        }
      }
    });
    console.log(this.myItems);
    console.log('>>>> my items count', this.myItemsCount);
    return this.myItems;
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
    this.recentlyAddedItems = this._db.list('/items', {
      query: {
        orderByChild: 'createAt',
        limitToLast: 5
      }
    }) as
    FirebaseListObservable<Item[]>;

    return this.recentlyAddedItems;
  }

  updateItem(key: string, updItem: Item) {
    return this.items.update(key, updItem);
  }
  deleteItem(key: string) {
    return this.items.remove(key);
  }
}

