import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

import { GlobalEventsManagerService } from './global.event.manager.service';

import { User } from '../models/user';
@Injectable()

export class AuthService {
  public user: User;
  users: FirebaseListObservable<User[]>;
  public currentUser;
  public isLoggedIn = false;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private globalEventManager: GlobalEventsManagerService,
    private db: AngularFireDatabase ) {
      this.users = this.db.list('/users') as
      FirebaseListObservable<User[]>;
    }
  getCurrentUser() {
    return this.currentUser = firebase.auth().currentUser;
  }

  getUsers() {
    let users = [];
    this.db.list('/users').subscribe( usersList => {
      users = usersList;
    });
    return users;
  }

  addUser() {
    let  existingUser = 0;
    this.user = this.getUserInformation ();
    this.getUsers().forEach(user => {
      if (user.userUid === this.user.userUid) {
        existingUser ++;
      }
    });
    if (existingUser !== 0) {
      return;
    } else {
      return this.db.object(`/users/${this.user.userUid}`).update(this.user);
    }
  }
  authenticate() {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in');
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
    return this.isLoggedIn;
  }

  getUserInformation () {
    const user = this.getCurrentUser();
    if (user != null) {
      console.log('logged in user is ', user);
      this.isLoggedIn = true;
      return {
        displayName: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        userUid: user.uid,
        isLoggedIn: this.isLoggedIn
    }
  }
  return null;
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then( data => {
      this.globalEventManager.switchNavBar(true);
      this.router.navigate(['']);
      this.addUser();
    });
    console.log('logging with google');
  }

  loginWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then( data => {
      this.globalEventManager.switchNavBar(true);
      this.router.navigate(['']);
      this.addUser();
    });
    console.log('logging with facebook');
  }

  loginWithTwitter() {
    const provider = new firebase.auth.TwitterAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then( data => {
      this.globalEventManager.switchNavBar(true);
      console.log(data);
      this.router.navigate(['']);
      this.addUser();
    },
    error => {
      console.log('an error has occured ', error);
    });
    console.log('logging with twitter');
  }

  logout() {
    this.afAuth.auth.signOut().then( data => {
      this.globalEventManager.switchNavBar(false);
      this.router.navigate(['']);
    });
  }
}
