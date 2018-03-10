import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../../models/user.model";
import {MessageServiceService} from "../../message-service.service";
import {Subject} from "rxjs/Subject";
@Component({
  selector: 'app-main-screen-view',
  templateUrl: './main-screen-view.component.html',
  styleUrls: ['./main-screen-view.component.css']
})
export class MainScreenViewComponent implements OnInit {
  currentTeam: User[];
  groupMessages: {};
  modalStatus: boolean = false;
  currentlySelectedPost: {};
  markdown: string = '### Hello World\n' +
    '      * a list\n' +
    '      * of items\n' +
    '      ```\n' +
    '      function(str){\n' +
    '        return str;\n' +
    '      };\n';

  constructor(private messageService: MessageServiceService) { }

  ngOnInit() {
    this.messageService.currentTeam.subscribe((data) => {
      this.currentTeam = data;
    });
    this.messageService.groupMessages.subscribe((data) => {
      this.groupMessages = data;
    });
  }
  outerOpenModal(person, post) {
    console.log('i work');
    this.currentlySelectedPost = {
      ...person,
      ...post
    };
    console.log(this.currentlySelectedPost);
    // this.modalStatus = true;
  }
  closeModal() {
    this.modalStatus = false;
  }



}
