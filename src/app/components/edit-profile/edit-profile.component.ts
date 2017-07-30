import { Component, OnInit, Input, ElementRef, NgZone, ViewChild,  } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { User } from '../../models/user';

import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';


@Component({
  moduleId: module.id,
  templateUrl: './edit-profile.component.html',
  styleUrls: ['edit-profile.component.css']
})

export class EditProfileComponent implements OnInit {
  public editProfileFrom: FormGroup;
  private user: User;
  private updUser: User;
  public isCollapsed = true;
  private isValid = false ;
  @ViewChild('address')
  public addressElementref: ElementRef;
  mode = 0; // image-upaload.component receives this input 0: edit-profile.component, 1: add-item.component
  profileImgUrl: string;
  constructor(
    private _fb: FormBuilder,
    private _firebaseService: FirebaseService,
    private _router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.isCollapsed = true;
    if (this._firebaseService.getCurrentUser()) {
      this.user = this._firebaseService.getCurrentUser();
      this.profileImgUrl = this.user.photoUrl;
    }
  }

  ngOnInit() {
    // address google autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.addressElementref.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
        });
      })
    });
    this.editProfileFrom = this._fb.group({
      userLifeStory: new FormControl(this.user.lifeStory ? this.user.lifeStory : '', Validators.maxLength(200)),
      userBirthDate: new FormControl(this.user.birthDate ? this.user.birthDate : '', CustomValidators.date),
      userPhone: new FormControl(this.user.phone ? this.user.phone : '', Validators.compose([
        CustomValidators.phone('JP')
      ])),
      userAddress: new FormControl(this.user.address ? this.user.address : ''),
      userEmail: new FormControl(this.user.email, Validators.compose([
        Validators.required,
        CustomValidators.email])),
      userDisplayName: new FormControl(this.user.displayName, Validators.required)
    });
    this.editProfileFrom.valueChanges.subscribe(data => this.onFormValueChanged(data))
    this.editProfileFrom.patchValue({
      userLifeStory: this.user.lifeStory ? this.user.lifeStory : '',
      userBirthDate: this.user.birthDate ? this.user.birthDate : '',
      userPhone: this.user.phone ? this.user.phone : '',
      userAddress: this.user.address ? this.user.address : '',
      userEmail: this.user.email ? this.user.email : '',
      userDisplayName: this.user.displayName ? this.user.displayName : ''
    });
  }
  imageUrlChange(event) {
    this.profileImgUrl = event;
  }

  onFormValueChanged(data?: any) {
    if (!this.editProfileFrom) {
      return;
    }
    const form = this.editProfileFrom;
    // tslint:disable-next-line:forin
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if ( control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + '';
        }
      }
    }
  }

  updateProfile() {
    // tslint:disable-next-line:forin
    this.isValid = false;
    for (const field in this.formErrors) {
      if (this.formErrors[field] === '') {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    }
    if (!this.editProfileFrom.hasError) {
      this.updUser = {
        email: this.editProfileFrom.controls['userEmail'].value,
        displayName: this.editProfileFrom.controls['userDisplayName'].value,
        photoUrl: this.profileImgUrl,
        userUid: this.user.userUid,
        lifeStory: this.editProfileFrom.controls['userLifeStory'].value,
        birthDate: this.editProfileFrom.controls['userBirthDate'].value,
        phone: this.editProfileFrom.controls['userPhone'].value,
        address: this.editProfileFrom.controls['userAddress'].value,
      }
      this._firebaseService.updateUser(this.updUser);
      this._router.navigate(['./profile']);
    } else {
    }
  }

  // tslint:disable-next-line:member-ordering
  formErrors = {
    'userDisplayName': '',
    'userLifeStory': '',
    'userBirthDate': '',
    'userPhone': '',
    'userAddress': '',
    'userEmail': '',
  }

  // tslint:disable-next-line:member-ordering
  validationMessages = {
    'userDisplayName': {
      'required': 'A display name is required.'
    },
    'userLifeStory': {
      'maxlength': 'Your story life should be no longer than 200 words'
    },
    'userBirthDate': {
      'date': 'please enter a valid birthdate (dd/mm/yyyy).'
    },
    'userPhone': {
      'phone': 'please enter a valid phone number.'
    },
    'userEmail': {
      'required': 'email address is required',
      'email': 'please enter a valid email address.'
    }
  }
}
