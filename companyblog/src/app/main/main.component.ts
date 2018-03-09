import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as firebase from "firebase";
import {CookieService} from "ngx-cookie-service";
import {AuthServiceService} from "../auth-service.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: []
})
export class MainComponent implements OnInit {
  userId: any;
  constructor(private httpClient: HttpClient, private cookies: CookieService, private authService: AuthServiceService) { }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCY0-3pvojl0mSK6khcHxHo5iZN_4emmEY",
      authDomain: "companyblog-59008.firebaseapp.com",
      databaseURL: "https://companyblog-59008.firebaseio.com",
      projectId: "companyblog-59008",
      storageBucket: "companyblog-59008.appspot.com",
      messagingSenderId: "1001707742445"
    });
    if(this.cookies.check('currentUser')) {
      const cookie = this.cookies.getAll();
      const currentUserCookie = cookie['currentUser'];
      this.authService.becomeAuthenticated(this.cookieCleaner(currentUserCookie));
    }




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
  onAuthorize() {

    this.httpClient.get('http://localhost:3002/auth/github');
  }
}

