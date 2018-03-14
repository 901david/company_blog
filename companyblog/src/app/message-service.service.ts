import {Injectable, Output} from '@angular/core';
import * as firebase from "firebase";
import {Subject} from "rxjs/Subject";
import {User} from "./models/user.model";
import {AuthServiceService} from "./auth-service.service";

@Injectable()
export class MessageServiceService {
  @Output() currentTeam = new Subject<any>();
  @Output() groupMessages = new Subject<any>();
  @Output() teamMessages = new Subject<any>();
  @Output() unreadTeamMessages = new Subject<any>();
  @Output() unreadTeamBlasts = new Subject<any>();
  @Output() unreadGroupMessages = new Subject<any>();

  constructor(private authService: AuthServiceService) { }
  getMessages() {
    //handles getting user messages
    firebase.database().ref(`/users`).once('value', (snap) => {
      const team = snap.val();
      const teamArray = [];
      for(let user in team) {
        teamArray.push({
          ...team[user],
          messages: this.filterMessages(team[user]['messages'])
        });
      }
      this.currentTeam.next(teamArray);
      this.unreadTeamMessages.next(teamArray);

    });
    //handles getting group messagesß
    firebase.database().ref('/groups').once('value',(snap) => {
      const groupMessages = [];
      const groupObj = snap.val();
      for(let key in groupObj) {
        groupMessages.push({
          groupName: key,
          messages: this.filterMessages(groupObj[key])
        });
      }
      this.groupMessages.next(groupMessages);
      this.unreadGroupMessages.next(groupMessages);
    });
    //handles getting team messages
    firebase.database().ref('/teamBlasts').once('value', (snap) => {
      const teamMessages = snap.val();
      this.teamMessages.next(this.filterMessages(teamMessages));
      this.unreadTeamBlasts.next(this.filterMessages(teamMessages));
    });

  };
  //handles control of the viewed By Column on firebase database
  messageViewHandler(fid, user, author, viewedBy, type, avatar) {
    const inViewedBy = this.unreadFilterNumber(user, viewedBy);
    const newViewedBy = inViewedBy > 0 ? [...viewedBy] : [...viewedBy, {user, avatar}];
      if(type.type === 'Team Blast') {
        firebase.database().ref(`/teamBlasts/${fid}`).update({viewedBy: newViewedBy});
      }
      else if(type.type === 'Group') {
        firebase.database().ref(`/groups/${type.name}/${fid}`).update({viewedBy: newViewedBy});
      }
      else {
        //Then it must be a regular user post
        firebase.database().ref(`/users/${author}/messages/${fid}`).update({viewedBy: newViewedBy});
      }
  }
  //this function will handle the group messaging being filtered
  filterGroupsForUnread(arr, user) {
    const newFilteredArray = [];
    for(let group of arr) {
      const newFilteredGroup = [];
        newFilteredGroup.push(this.filterRead(group.messages, user));
      newFilteredArray.push(newFilteredGroup);
    }
    return newFilteredArray;
  }
  //A function that takes the messages object and turns it into an array of objects
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
  //a function that will filter out the read messages and emit that array to the main component
  filterRead = (arr, user) => {
    const unreadMessages = [];
    for (let item of arr) {
      let flag = false
      const viewedArray = item.viewedBy ? item.viewedBy : [];
      for(let itemObj of viewedArray) {
        console.log(itemObj.user, user);
        if(itemObj.user === user) {
          flag = true;
        }

      }
      if(!flag) {
        unreadMessages.push(item);
      }
    }

    return unreadMessages;
  }
  unreadFilterNumber(user, objArray) {
    console.log(user, objArray);
    let counter = 0;
    for(let viewer of objArray) {
      if(viewer.viewedBy && viewer.viewedBy.user === user) {
        counter++;
      }
    }
    return counter;
  }


}
