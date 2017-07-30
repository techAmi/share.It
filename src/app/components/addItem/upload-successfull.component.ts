import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'upload-successfull.component.html',
  styleUrls: ['upload-successfull.component.css']
})
export class UploadSuccessfullComponent {

  constructor (private _router: Router ) {}
  onAddAnotherBtnClick() {
    // this._router.navigate(['addItem']);

  }
}
