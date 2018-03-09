import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import * as firebase from 'firebase';
import {User} from "./models/user.model";
import {Router} from "@angular/router";

@Injectable()
export class AuthServiceService {
  isAuthenticated: boolean = false;
  currentUserProfile: User;
  constructor(private cookie: CookieService, private router: Router) { }
  becomeAuthenticated (cookie) {
    this.isAuthenticated  = true;
    firebase.database().ref(`/users/${cookie.userName}`).once('value').then((snap) => {
      this.currentUserProfile = snap.val();
      return this.currentUserProfile;
    });
    this.router.navigate(['/dashboard']);

  }
  logout() {
    this.isAuthenticated = false;
    this.cookie.delete('currentUser');
  }

}
