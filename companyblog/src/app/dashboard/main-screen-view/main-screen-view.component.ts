import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {User} from "../../models/user.model";
import {MessageServiceService} from "../../message-service.service";
@Component({
  selector: 'app-main-screen-view',
  templateUrl: './main-screen-view.component.html',
  styleUrls: ['./main-screen-view.component.css']
})
export class MainScreenViewComponent implements OnInit {
  currentTeam: User[];
  groupMessages: any;
  constructor(private messageService: MessageServiceService) { }

  ngOnInit() {
    this.messageService.currentTeam.subscribe((data) => {
      this.currentTeam = data;
      console.log(data);
    });
    this.messageService.groupMessages.subscribe((data) => {
      this.groupMessages = data;
      console.log(data);
    });
  }


}
