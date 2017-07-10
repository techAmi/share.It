import { Component, Input, OnInit, OnChanges, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import 'firebase/storage';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../services/auth.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Image {
  path: string,
  filename: string,
  downloadUrl?: string,
  $key?: string
}


@Component({
  moduleId: module.id,
  selector: 'image-upload',
  template: `
    <form ngNoForm>
      <div class="row">
                <div class="">
                  <div class="col-lg-10 text-center well col-lg-offset-1">
                    <input id="file" name="file" type="file" >
                    <i class="material-icons md-48">photo_library</i>
                  </div>
                </div>
      </div>
      <input id="file" name="file" type="file" >
      <button (click)="upload()" type="button">Upload</button>
    </form>

    <div style="overflow:hidden;">
      <div *ngFor="let img of imageList | async"
      style="position:relative;width:100px;height:100px;float:left;display:flex;justify-content:center;align-items:center;">
            <img [src]="img.downloadURL | async" style="max-width:100px;max-height:100px;">
            <button (click)="delete(img)" style="position:absolute;top:2px;right:2px;">[x]</button>
      </div>
    </div>


  `,
  })

export class UploadComponent implements OnInit {
  /**
   * the name of the folder for images
   * eg. posts/angular-is-awsome
   */

  private folder: string;
  fileList: FirebaseListObservable<Image[]>;
  ImageList: Observable<Image[]>;

  constructor (private _af: AngularFireDatabase,
               private _router: Router,
               private _as: AuthService) {
                this.folder = _as.getUserInformation().userUid;
  }
  ngOnInit() {

  }

  ngOnChanges() {
    console.log ('new values for folder');
    const storage = firebase.storage();
    console.log('storage', storage);

    this.fileList = this._af.list(`/${this.folder}/images`) as
    FirebaseListObservable<Image[]>;
    console.log('rendering all images in ', `/${this.folder}/images`);
    this.ImageList = this.fileList.map( itemList =>
      itemList.map( item => {
        const pathReference = storage.ref(item.path);
        const result = {$key: item.$key, downloadUrl: pathReference.getDownloadURL(), path: item.path, filename: item.filename};
        console.log(result);
      }));
  }

  upload() {
    // Create a root reference
    console.log ('firebase app ', firebase)
    const storageRef = firebase.storage().ref();

    const success = false;

    // this currently only grabs item 0 refactor it to grab them all
    for (const selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
            console.log(selectedFile);
            // Make local copies of services because "this" will be clobbered
            const router = this._router;
            const af = this._af;
            const folder = this.folder;
            const path = `/${this.folder}/${selectedFile.name}`;
            const iRef = storageRef.child(path);
            iRef.put(selectedFile).then((snapshot) => {
                console.log('Uploaded a blob or file! Now storing the reference at', `/${this.folder}/images/`);
                af.list(`/${folder}/images/`).push({ path: path, filename: selectedFile.name })
            });
        }
    }
    delete(image: Image) {
        const storagePath = image.path;
        const referencePath = `${this.folder}/images/` + image.$key;

        // Do these as two separate steps so you can still try delete ref if file no longer exists

        // Delete from Storage
        firebase.storage().ref().child(storagePath).delete()
        .then(
            () => {},
            (error) => console.error('Error deleting stored file', storagePath)
        );

        // Delete references
        this._af.object(referencePath).remove()

    }
  }

