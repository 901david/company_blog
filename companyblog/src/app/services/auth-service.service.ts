import {Injectable, Output} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import * as firebase from 'firebase';
import {User} from "../models/user.model";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthServiceService {
  @Output() isAuthenticated = new Subject<boolean>();
  currentUserProfile: User;

  constructor(private cookie: CookieService,
              private router: Router,
              private httpClient: HttpClient) {
  }
  //Used by AUthGuard to determine continued cookie expiration check for every route
  confirmedAuthenticated() {
    if (this.cookie.check('currentUser')) {
      return true;
    }
    else {
      this.isAuthenticated.next(false);
      this.router.navigate(['/']);
    }
    }
  //Sets up redirect from / to dashboard for authenticated user.
  becomeAuthenticated(cookieString) {
      const cleanedObj = this.cookieCleaner(cookieString);
      this.isAuthenticated.next(true);
      firebase.database().ref(`/users/${cleanedObj['userName']}`).once('value').then((snap) => {
          this.currentUserProfile = snap.val();
        this.router.navigate(['/dashboard']);
        return;
        });
      }
  //logs a user out
  logout() {
    this.isAuthenticated.next(false);
    this.cookie.delete('currentUser');
    this.httpClient.get('/logout');
  }
  //Cleans the cookie string that is passed from the Oauth callback route and makes it into
  //a usable object
  cookieCleaner (cookieString) {
    let currentIndexPosition = 0;
    const userObj = {};
    const userArray = [];
    while(cookieString.indexOf('"', currentIndexPosition) !== -1) {
      const start = cookieString.indexOf('"', currentIndexPosition);
      const end = cookieString.indexOf('"', start + 1);
      userArray.push(cookieString.slice(start + 1, end));
      currentIndexPosition = end + 1;
    }
    for(let i = 0; i < userArray.length; i += 2) {
      userObj[userArray[i]] = userArray[i + 1];
    }
    return userObj;
  }
}
