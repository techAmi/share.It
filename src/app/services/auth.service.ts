import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable()

export class AuthService {
  public user;
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router) {
  }

  getCurrentUser() {
  return this.user = firebase.auth().currentUser;
  }
  authenticate() {
    return this.afAuth.auth;
  }

  getUserInformation () {
    const user = this.getCurrentUser();
    if (user != null) {
      return {
        displayName: user.displayName,
        email: user.email
    }
    }
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then( data => {
      this.router.navigate(['dashboard']);
    })
  }

  loginWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then( data => {
      this.router.navigate(['dashboard']);
    })
  }

  loginWithTwitter() {
    const provider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then( data => {
      this.router.navigate(['dashboard']);
    })
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['']);
  }
}
