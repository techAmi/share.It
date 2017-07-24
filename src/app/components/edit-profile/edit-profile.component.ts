import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  moduleId: module.id,
  templateUrl: './edit-profile.component.html',
  styleUrls: ['edit-profile.component.css']
})

export class EditProfileComponent implements OnInit {
  public editProfileFrom: FormGroup;
  private user: User;
  private updUser: User;
  public isCollapsed: true;
  constructor(
    private _fb: FormBuilder,
    private _firebaseService: FirebaseService,
    private _router: Router
  ) {
    this.isCollapsed = true;
    if (this._firebaseService.getCurrentUser()) {
      this.user = this._firebaseService.getCurrentUser();
      console.log(this.user);
    }
  }

  ngOnInit() {
    this.editProfileFrom = this._fb.group({
      userLifeStory: new FormControl(this.user.lifeStory ? this.user.lifeStory : '', Validators.maxLength(200)),
      userBirthDate: new FormControl(this.user.birthDate ? this.user.birthDate : ''),
      userPhone: new FormControl(this.user.phone ? this.user.phone : ''),
      userAddress: new FormControl(this.user.address ? this.user.address : ''),
      userEmail: new FormControl(this.user.email, Validators.required),
      userDisplayName: new FormControl(this.user.displayName, Validators.required)
    });
    this.editProfileFrom.patchValue({
      userLifeStory: this.user.lifeStory ? this.user.lifeStory : 'nothing found',
      userBirthDate: this.user.birthDate ? this.user.birthDate : 'nothing found',
      userPhone: this.user.phone ? this.user.phone : 'nothing found',
      userAddress: this.user.address ? this.user.address : 'nothing found',
      userEmail: this.user.email ? this.user.email : 'nothing found',
      userDisplayName: this.user.displayName ? this.user.displayName : 'nothing found'
    });
    console.log(this.editProfileFrom);
  }

  updateProfile() {
    this.updUser = {
      email: this.editProfileFrom.controls['userEmail'].value,
      displayName: this.editProfileFrom.controls['userDisplayName'].value,
      photoUrl: this.user.photoUrl,
      userUid: this.user.userUid,
      lifeStory: this.editProfileFrom.controls['userLifeStory'].value,
      birthDate: this.editProfileFrom.controls['userBirthDate'].value,
      phone: this.editProfileFrom.controls['userPhone'].value,
      address: this.editProfileFrom.controls['userAddress'].value,
    }
    this._firebaseService.updateUser(this.updUser);
    this._router.navigate(['./profile']);
  }
}
