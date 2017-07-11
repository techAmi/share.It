import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Item } from '../../models/item';
import { Category } from '../../models/category';
import { Condition } from '../../models/condition';

import { FirebaseService } from '../../services/firebase.service';

import { UploadComponent } from '../../utils/image-upload.component';

@Component({
  moduleId: module.id,
  selector: 'app-add-item',
  templateUrl: 'addItem.component.html',
  styleUrls: ['addItem.component.css']

})

export class AddItemComponent implements OnInit {
  categories: Category[];
  conditions: Condition[];
  newItem: Item;
  private newItemImageUrl: string;
  toNextStep = false;

  public addItemStep1Form: FormGroup;
  public addItemStep2Form: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _firebaseService: FirebaseService ) {
  }
  ngOnInit() {
    this._firebaseService.getCategories().
    subscribe( categories => {
      this.categories = categories;
    }, error => {
      console.log(error);
    });

    this._firebaseService.getConditions().
    subscribe ( conditions => {
      this.conditions = conditions;
    }, error => {
      console.log(error);
    });
    // step 1 form group
    this.addItemStep1Form = this._fb.group({
      itemName: new FormControl('', Validators.required),
      itemCategory: new FormControl(this.categories ? this.categories[0].name : '', Validators.required),
      itemCondition: new FormControl(this.conditions ? this.conditions[0].name : '', Validators.required),
      itemOriginalPrice: new FormControl('', Validators.required),
      itemYearBought: new FormControl('', Validators.required)
    });
    // step 2 form group
    this.addItemStep2Form = this._fb.group({
      itemDescription: new FormControl('', Validators.required),
    });
  }
  onNextBtnClick() {
    console.log(this.addItemStep1Form);
    this.toNextStep = true;
  }

  imageUrlChange(event) {
    this.newItemImageUrl = event;
  }

  onSubmitBtnClick() {
    this.newItem = {
      itemCategory: this.addItemStep1Form.controls['itemCategory'].value ,
      itemName: this.addItemStep1Form.controls['itemName'].value ,
      itemCondition: this.addItemStep1Form.controls['itemCondition'].value ,
      itemOriginalPrice: this.addItemStep1Form.controls['itemOriginalPrice'].value ,
      itemYearBought: this.addItemStep1Form.controls['itemYearBought'].value,
      itemDescription: this.addItemStep2Form.controls['itemDescription'].value,
      itemImageUrl: this.newItemImageUrl ,
    }
    console.log ('the new added item', this.newItem);
    this._firebaseService.addItem(this.newItem);
  }
}
