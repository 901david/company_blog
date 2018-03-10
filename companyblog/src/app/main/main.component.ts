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
    if(this.cookies.check('currentUser')) {
      this.authService.becomeAuthenticated(this.cookies.get('currentUser'));

    }

  }

}

