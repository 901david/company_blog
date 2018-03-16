import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {MaterializeAction} from "angular2-materialize";
import {Subject} from "rxjs/Subject";
import {AuthServiceService} from "../../auth-service.service";
import {MessageServiceService} from "../../message-service.service";

@Component({
  selector: 'app-modal-markdown',
  templateUrl: './modal-markdown.component.html',
  styleUrls: ['./modal-markdown.component.css']
})
export class ModalMarkdownComponent implements OnInit {
  modalActions = new EventEmitter<string|MaterializeAction>();
  @Input() currentPost: {};
  @Input() modalNotifier: Subject<boolean>;
  currentUser: string;
  constructor(private authService: AuthServiceService,
              private messageService: MessageServiceService) { }

  ngOnInit() {
    this.modalNotifier.subscribe((value: boolean) => {
        if(value) {
          this.openModal();
        }
    });
    this.currentUser = this.authService.currentUserProfile.userName;
    console.log('here is my current user', this.currentUser);
  }

  //controls modal open
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
    console.log(this.currentPost);
  }
  //controls modal close
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
    this.messageService.getMessages();
  }

}
