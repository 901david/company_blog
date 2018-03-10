import {Component, OnInit} from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor() {}

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
}
