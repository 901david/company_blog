import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import * as firebase from 'firebase';
import {User} from "./models/user.model";
import {Router} from "@angular/router";

@Injectable()
export class AuthServiceService {
  isAuthenticated: boolean = false;
  currentUserProfile: User;

  constructor(private cookie: CookieService, private router: Router) {
  }

  confirmedAuthenticated() {
    if (this.cookie.check('currentUser')) {
      return true;
    }
    else {
      this.isAuthenticated = false;
      this.router.navigate(['/']);
    }
    }

  becomeAuthenticated(cookieString) {
      const cleanedObj = this.cookieCleaner(cookieString);
      this.isAuthenticated = true;
      firebase.database().ref(`/users/${cleanedObj['userName']}`).once('value').then((snap) => {
          this.currentUserProfile = snap.val();
        this.router.navigate(['/dashboard']);
        return;
        });
      };

  logout() {
    this.isAuthenticated = false;
    this.cookie.delete('currentUser');
  }

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
