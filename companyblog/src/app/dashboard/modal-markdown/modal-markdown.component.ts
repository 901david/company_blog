import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {MaterializeAction} from "angular2-materialize";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-modal-markdown',
  templateUrl: './modal-markdown.component.html',
  styleUrls: ['./modal-markdown.component.css']
})
export class ModalMarkdownComponent implements OnInit {
  modalActions = new EventEmitter<string|MaterializeAction>();
  currentPost: {};
  constructor() { }

  ngOnInit() {

  }
  @Input()
  set currentlySelectedPost(data) {
    data.subscribe((dataObj) => {
        this.currentPost = dataObj
    });
      this.openModal();
  }
  //controls modal open
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  //controls modal close
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

}
