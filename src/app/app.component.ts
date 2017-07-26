import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn: boolean;
  constructor (
    private as: AuthService,
    translate: TranslateService
   ) {
     // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the language to use if the language isn't available, it will use the current loader to get them
    // translate.use('en');

    this.isLoggedIn = this.as.authenticate();
  }

}
