import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Item } from '../models/item';
import { Category } from '../models/category';
import { Condition } from '../models/condition';

@Injectable()

export class FirebaseService {
  items: FirebaseListObservable<Item[]>;
  categories: FirebaseListObservable<Category[]>;
  conditions: FirebaseListObservable<Condition[]>;

  constructor(private _db: AngularFireDatabase) {

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
}

