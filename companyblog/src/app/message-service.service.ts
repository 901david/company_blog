import {Injectable, Output} from '@angular/core';
import * as firebase from "firebase";
import {Subject} from "rxjs/Subject";
import {User} from "./models/user.model";

@Injectable()
export class MessageServiceService {
  @Output() currentTeam = new Subject<Array<User>>();
  @Output() groupMessages = new Subject();
  currentUserUnread: User[];
  groupMessagesUnread: any;
  constructor() { }
  getMessages() {
    //handles getting user messages
    firebase.database().ref(`/users`).once('value').then( (snap) => {
      const team = snap.val();
      const teamArray = [];
      for(let user in team) {
        teamArray.push({
          ...team[user],
          messages: this.filterMessages(team[user]['messages'])
        });
      }
      this.currentTeam.next(teamArray);

    });
    //handles getting group messages
    firebase.database().ref('/groups').once('value').then((snap) => {
      const groupMessages = [];
      const groupObj = snap.val();
      for(let key in groupObj) {
        groupMessages.push({
          groupName: key,
          messages: this.filterMessages(groupObj[key])
        });
      }
      this.groupMessages.next(groupMessages);
    });
  };
  filterMessages (obj) {
    const returnArray = [];
    for(let key in obj) {
      returnArray.push({
        ...obj[key],
        fid: key
      });

    }
    return returnArray;
  }
  filterRead(arr) {

  }
}
