import {Component, OnInit, Output} from '@angular/core';
import {AuthServiceService} from "../../auth-service.service";
import {User} from "../../models/user.model";
import {MessageServiceService} from "../../message-service.service";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser: User;
  teamPosts: User[];
  groupPosts: any;
  teamBlastPosts: any;
  yourPosts:User;
  sidebarNotifier = new Subject<any>();
  unreadTeamBlastsNumber:number;
  unreadTeamNumber:number;
  unreadGroupNumber:number;
  unreadIndividualBadgeNumbers;
  constructor(private authService: AuthServiceService,
              private messageService: MessageServiceService) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUserProfile;
    this.messageService.getMessages();
    this.messageService.currentTeam.subscribe((data) => {
      if(data) {
        const dataObj = this.myPosts(data);
        this.teamPosts = dataObj['teamPosts'];
        this.yourPosts = dataObj['myPosts'][0];
      }

    });
    this.messageService.groupMessages.subscribe((data) => {
        this.groupPosts = data;
    });
    this.messageService.teamMessages.subscribe((data) => {
      this.teamBlastPosts = data;
    });
    this.messageService.unreadTeamMessages.subscribe((data) => {
      this.unreadTeamNumber = this.findNumberOfUnreadsForBadge(data);
      this.unreadIndividualBadgeNumbers = this.findNumberOfUnreadsForTeamMembers(data);
    });
    this.messageService.unreadTeamBlasts.subscribe((data) => {
      this.unreadTeamBlastsNumber = data.length;
    })
    this.messageService.unreadGroupMessages.subscribe((data) => {
      this.unreadGroupNumber = this.findNumberOfUnreadsForBadge(data);
    });

  }
  //return my posts only
  myPosts(arr: User[]) {
    const dataArray = arr.slice();
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].userName === this.currentUser.userName) {
        const myPosts = dataArray.splice(i, 1);
        const teamPosts = dataArray;
        return {
          myPosts,
          teamPosts
        };
      }
    }
    return dataArray;
  }
  outerOpenModal(person, post, type) {
    this.sidebarNotifier.next({person, post, type});
  }
  //This function returns number of new posts for groups and teams
  findNumberOfUnreadsForBadge(arr) {
    let counter = 0;
    for(let item of arr) {
      if(item.messages) {
        counter += item.messages.length;
      }
    }
    return counter;
  }
  findNumberOfUnreadsForTeamMembers(arr) {
    const newBadgeArray = {};
    for(let member of arr) {
      if(member.messages && member.messages !== 0) {
        newBadgeArray[member.userName] = member.messages.length;
      }
    }
    return newBadgeArray;
  }


}
