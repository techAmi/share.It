import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';
import { Item } from '../../models/item';
import { Condition } from '../../models/condition';
import { Category } from '../../models/category';
import { User } from '../../models/user';

@Component({
  moduleId: module.id,
  selector: 'edit-item',
  templateUrl: 'edit-item.component.html',
  styleUrls: ['edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  @ViewChild('itemDetailsModal') public itemDetailsModal: ModalDirective;
  @ViewChild('itemImageModal') public itemImageModal: ModalDirective;
  public categories: Category[];
  public conditions: Condition[];
  public item: Item;
  private updItem: Item;
  public editItemDetailsForm: FormGroup;
  public imageUrl: string;
  @Input() itemKey: string;
  private currentUser: User;

  constructor(
    private _firebaseService: FirebaseService,
    private _fb: FormBuilder,
    private _as: AuthService) {
      this.editItemDetailsForm = this._fb.group({
        itemName: new FormControl('', Validators.required),
        itemCategory: new FormControl(this.categories ? this.categories[0].name : '', Validators.required),
        itemCondition: new FormControl(this.conditions ? this.conditions[0].name : '', Validators.required),
        itemOriginalPrice: new FormControl('', Validators.required),
        itemYearBought: new FormControl('', Validators.required),
        itemDescription: new FormControl('', Validators.required),
        itemBrand: new FormControl(''),
        itemModel: new FormControl(''),
      });
      this.currentUser = this._firebaseService.getCurrentUser();
  }
  ngOnInit() {
    console.log('item key', this.itemKey);
    this.item = this._firebaseService.getItem(this.itemKey);
    console.log('this item will be edited ', this.item);
    this._firebaseService.getCategories().subscribe( categories => {
        this.categories = categories;
      }
    );
    this._firebaseService.getConditions().subscribe ( conditions => {
      this.conditions = conditions;
    })
    this.imageUrl = this.item.itemImageUrl;
    this.editItemDetailsForm.patchValue({
      itemName: this.item.itemName,
      itemCategory: this.item.itemCategory,
      itemCondition: this.item.itemCondition,
      itemOriginalPrice: this.item.itemOriginalPrice,
      itemYearBought: this.item.itemYearBought,
      itemDescription: this.item.itemDescription,
      itemBrand: this.item.itemBrand ? this.item.itemBrand : '',
      itemModel: this.item.itemModel ? this.item.itemModel : '',
    })
  }
  editItem() {
    this.itemDetailsModal.show();
    this.itemImageModal.show();
    this.item = this._firebaseService.getItem(this.itemKey);
    console.log('item to edit XXXX', this.item);
  }

  onCancelBtnClick() {
    console.log(this.itemKey);
    this.itemDetailsModal.hide();
    this.itemImageModal.hide();
  }
  updateItem() {
    this.updItem = {
      itemCategory: this.editItemDetailsForm.controls['itemCategory'].value,
      itemName: this.editItemDetailsForm.controls['itemName'].value,
      itemCondition: this.editItemDetailsForm.controls['itemCondition'].value,
      itemOriginalPrice: this.editItemDetailsForm.controls['itemOriginalPrice'].value,
      itemYearBought: this.editItemDetailsForm.controls['itemYearBought'].value,
      itemDescription: this.editItemDetailsForm.controls['itemDescription'].value,
      itemImageUrl: this.imageUrl,
      itemBrand: this.editItemDetailsForm.controls['itemBrand'].value,
      itemModel: this.editItemDetailsForm.controls['itemModel'].value,
      itemOwner: this.currentUser
    }
    console.log(this.updItem);
    this._firebaseService.updateItem(this.itemKey, this.updItem);
  }

  deleteItem() {
    console.log('element of key  ' + this.itemKey + ' will be deleted');
    this._firebaseService.deleteItem(this.itemKey);
    this.onCancelBtnClick();
  }
}
