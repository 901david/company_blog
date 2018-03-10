import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {MaterializeAction} from "angular2-materialize";

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
  set currentlySelectedPost(obj: {}) {
      this.currentPost = obj;
      this.openModal();
  }
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

}
