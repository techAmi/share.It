import { Component, Input, OnInit, OnChanges, Inject, ElementRef, Output, EventEmitter } from '@angular/core';
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
  templateUrl: 'image-upload.component.html',
  styleUrls: ['image-upload.component.css']
  })

export class UploadComponent implements OnInit {
  /**
   * the name of the folder for images
   * eg. posts/angular-is-awsome
   */

  private folder: string;
  fileList: FirebaseListObservable<Image[]>;
  ImageList: Observable<Image[]>;
  public image: Image;
  @Input()
  public imageUrl = '';
  public imagePath: string;

  @Input()
  mode: number;

  @Output()
  emitImageUrl: EventEmitter<string> = new EventEmitter<string>();

  constructor (private _af: AngularFireDatabase,
               private _router: Router,
               private _as: AuthService,
               private element: ElementRef) {
                this.folder = _as.getUserInformation().userUid;
  }
  ngOnInit() {
    console.log('this is the mode of the parent component ', this.mode);
    if (this.mode === 0) {
      console.log('the parent component is profile edit');
      document.getElementById('image-preview').hidden = false;
    } else {
      console.log('some other parent component');
      document.getElementById('image-preview').hidden = true;
    }
  }

  changeListener() {
    console.log ('new values for folder');
    const storage = firebase.storage();
    console.log('storage', storage);

    this.fileList = this._af.list(`/${this.folder}/images`) as
    FirebaseListObservable<Image[]>;
    console.log('rendering all images in ', `/${this.folder}/images`);
    this.ImageList = this.fileList.map( itemList =>
      itemList.map( item => {
        const pathReference = storage.ref(item.path);
        this.imageUrl = pathReference.toString();
        const result = {$key: item.$key, downloadUrl: pathReference.getDownloadURL(), path: item.path, filename: item.filename};
        this.image.$key = result.$key;
        this.image.path = result.path;
        console.log (result);
        return result;
      }));
      console.log(this.ImageList);
  }
  // upload an item photo
  upload() {
    // document.getElementById('image-preview').hidden = false;
    if (this.mode === 0) {
      document.getElementById('upload-image').hidden = false;
      document.getElementById('image-preview').hidden = false;
    } else {
      document.getElementById('image-preview').hidden = false;
    }
    // this.changeListener();
    // Create a root reference
    console.log ('firebase app ', firebase);
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
            this.imagePath = path;
            console.log('path ', path );

            const iRef = storageRef.child(path);

            iRef.put(selectedFile).then((snapshot) => {
              this.imageUrl = snapshot.downloadURL;
              this.emitImageUrl.emit(this.imageUrl);
              console.log('image url ', this.imageUrl);
              document.getElementById('upload-image').hidden = true;
                // console.log('Uploaded a blob or file! Now storing the reference at', `/${this.folder}/images/`);
                // af.list(`/${folder}/images/`).push({ path: path, filename: selectedFile.name })
            });
        }
    }

    // delete an item photo (after it was uploaded)
    delete() {
      // create a reference to the storage service, which is used to create
      // references in storage bucket
      const storage = firebase.storage();
      // create a storage reference from firebase storage service
      const storageRef = storage.ref();

      const referencePath = this.imagePath;

      // create a reference to the file to delete
      const desertRef = storageRef.child(referencePath);

      // delete the file
      desertRef.delete().then(
        () => {console.log ('image deleted successfuly')},
        (error) => { console.log(error)}
      )

      // the file is deleted but still previewed
      // hide the previewed image too preview
      document.getElementById('image-preview').hidden = true;
      // display the area to uplaod an other image
      document.getElementById('upload-image').hidden = false;


    }
  }

