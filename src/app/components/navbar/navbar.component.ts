import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { GlobalEventsManagerService } from '../../services/global.event.manager.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  moduleId: module.id,
  selector: 'app-nav-bar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public languages: string [] = ['ENGLISH', 'JAPANESE']
  public isLoggedIn: boolean;
  public profilePhotoUrl: string;
  public switchNavbar = false;
  public breadCrumb: any;
  constructor (
    private as: AuthService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _firebaseService: FirebaseService,
    private globalEventManager: GlobalEventsManagerService,
    private translate: TranslateService
  ) {
    this.globalEventManager.switchNavBarEmitter.subscribe((mode) => {
      if (mode !== null ) {
        this.switchNavbar = mode;
        console.log('the navbar mode ', this.switchNavbar)
      }
      if (this._firebaseService.getCurrentUser() != null) {
      this.profilePhotoUrl = this._firebaseService.getCurrentUser().photoUrl;
      console.log(this.profilePhotoUrl);
    }
    });
  }
  ngOnInit() {
    this._router.events
    .filter(event => event instanceof NavigationEnd)
    .subscribe(event => {
      let currentRoute = this._route.root;
      while (currentRoute.children[0] !== undefined ) {
        currentRoute = currentRoute.children[0];
      }
      console.log('current route dataa', currentRoute.snapshot.data);
      this.breadCrumb = currentRoute.snapshot.data.breadCrumb;
      console.log('the breadcrumb', this.breadCrumb);
    })

  }
  changeLanguage(language: string) {
    // if the current default language is english
    if (this.translate.getDefaultLang() === 'en' ) {
      if (language === 'JAPANESE') {
        this.translate.setDefaultLang('jp');
        this.languages = ['英語', '日本語'];
      }
    } else if (this.translate.getDefaultLang() === 'jp') {
      if (language === '英語') {
        this.translate.setDefaultLang('en');
        this.languages = ['JAPANESE', 'ENGLISH']
      }

    }
    // this.translate.use('en')
  }

}
