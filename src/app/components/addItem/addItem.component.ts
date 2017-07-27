import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Item } from '../../models/item';
import { Category } from '../../models/category';
import { Branche } from '../../models/branche';
import { Condition } from '../../models/condition';
import { User } from '../../models/user';

import { FirebaseService } from '../../services/firebase.service';
import { DataSharingService } from '../../services/data-sharing.service';
import { AuthService } from '../../services/auth.service';
import { UploadComponent } from '../../utils/image-upload.component';

@Component({
  moduleId: module.id,
  selector: 'app-add-item',
  templateUrl: 'addItem.component.html',
  styleUrls: ['addItem.component.css']

})

export class AddItemComponent implements OnInit {
  categories: Category[];
  branches: Branche[];
  conditions: Condition[];
  currentUser: User;
  newItem: Item;
  private newItemImageUrl: string;
  toNextStep = false;

  public addItemStep1Form: FormGroup;
  public addItemStep2Form: FormGroup;
  public isValid = true;
  constructor(
    private _fb: FormBuilder,
    private _firebaseService: FirebaseService,
    private _router: Router,
    private _as: AuthService,
    private _dataService: DataSharingService ) {
      this.currentUser = {
      email : this._as.getUserInformation().email,
      displayName: this._as.getUserInformation().displayName,
      photoUrl: this._as.getUserInformation().photoUrl,
      userUid: this._as.getUserInformation().userUid
    };

  }
  ngOnInit() {

    console.log('current user ', this.currentUser);
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
      itemBranche: new FormControl('', Validators.required),
      itemCondition: new FormControl(this.conditions ? this.conditions[0].name : '', Validators.required),
      itemOriginalPrice: new FormControl('', Validators.compose(
        [
          Validators.pattern('^(([0-9]*)|(([0-9]*)\.([0-9]*)))$')
        ])),
      itemYearBought: new FormControl('', Validators.required)
    });
    this.addItemStep1Form.valueChanges.subscribe(data => this.onForm1ValueChanged(data));
    // step 2 form group
    this.addItemStep2Form = this._fb.group({
      itemDescription: new FormControl('', Validators.required),
    });
    this.addItemStep2Form.valueChanges.subscribe(data => this.onForm2ValueChanged(data));
    this.branches = this._dataService.branches;
  }

  onNextBtnClick() {
    this.isValid = false;
    // tslint:disable-next-line:forin
    for (const field in this.formStep1Errors) {
      const control = this.addItemStep1Form.get(field);
      if (control.untouched ) {
        this.isValid = false;
      } else if (this.formStep1Errors[field] === '') {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    }
    if (this.isValid) {
      this.toNextStep = true; // if this form is valid go to next form
    }
    console.log(this.addItemStep1Form);
  }

  imageUrlChange(event) {
    this.newItemImageUrl = event;
  }
  // validate form instantly
  onForm1ValueChanged(data?: any) {
    if (!this.addItemStep1Form) {
      return;
    }
    const form = this.addItemStep1Form;
    // tslint:disable-next-line:forin
    for (const field in this.formStep1Errors) {
      // clear previous error messages if any
      this.formStep1Errors[field] = '';
      const control = form.get(field);
      if ( control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formStep1Errors[field] += messages[key] + '';
        }
      }
    }
    console.log('form errors ', this.formStep1Errors);
  }
  // validation
  onForm2ValueChanged(data?: any) {
    if (!this.addItemStep2Form) {
      return;
    }
    const form = this.addItemStep2Form;
    // tslint:disable-next-line:forin
    for (const field in this.formStep2Errors ) {
      // clear previous error messages if any
      this.formStep2Errors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid ) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for ( const key in control.errors) {
          this.formStep2Errors[field] += messages[key] + '';
        }
      }
    }
  }

  onSubmitBtnClick() {
    this.isValid = false;
    // tslint:disable-next-line:forin
    for (const field in this.formStep1Errors) {
      const control = this.addItemStep1Form.get(field);
      if (control.untouched ) {
        this.isValid = false;
      } else if (this.formStep1Errors[field] === '') {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    }
    if (this.isValid) {
      console.log('item owner ', this.currentUser);
      this.newItem = {
        itemCategory: this.addItemStep1Form.controls['itemCategory'].value ,
        itemBranche: this.addItemStep1Form.controls['itemBranche'].value,
        itemName: this.addItemStep1Form.controls['itemName'].value ,
        itemCondition: this.addItemStep1Form.controls['itemCondition'].value ,
        itemOriginalPrice: this.addItemStep1Form.controls['itemOriginalPrice'].value ,
        itemYearBought: this.addItemStep1Form.controls['itemYearBought'].value,
        itemDescription: this.addItemStep2Form.controls['itemDescription'].value,
        itemImageUrl: this.newItemImageUrl,
      }
      this.newItem.itemOwner = this.currentUser;
      console.log ('the new added item', this.newItem);
      this._firebaseService.addItem(this.newItem);
      this._router.navigate(['upload-successfull']);
      }

  }

  // tslint:disable-next-line:member-ordering
  formStep1Errors = {
    'itemName': '',
    'itemOriginalPrice': '',
    'itemCategory': '',
    'itemBranche': '',
    'itemCondition': '',

  }
  // tslint:disable-next-line:member-ordering
  formStep2Errors = {
    'itemDescription': ''
  }
  // tslint:disable-next-line:member-ordering
  validationMessages = {
    'itemName': {
      'required': 'item name is required.'
    },
    'itemOriginalPrice': {
      'pattern': 'please enter a valid price.'
    },
    'itemCategory': {
      'required': 'item category is required.'
    },
    'itemBranche': {
      'required': 'item branche is required.'
    },
    'itemCondition': {
      'required': 'item condition is required.'
    },
    'itemDescription': {
      'required': 'item description is required'
    }

  }
}
