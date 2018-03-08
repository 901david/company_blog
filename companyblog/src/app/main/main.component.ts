import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as firebase from "firebase";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCY0-3pvojl0mSK6khcHxHo5iZN_4emmEY",
      authDomain: "companyblog-59008.firebaseapp.com",
      databaseURL: "https://companyblog-59008.firebaseio.com",
      projectId: "companyblog-59008",
      storageBucket: "companyblog-59008.appspot.com",
      messagingSenderId: "1001707742445"
    });
  }
  onAuthorize() {

    this.httpClient.get('http://localhost:3002/auth/github');
  }
}

