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
  groupPostsNewCount: number;
  sidebarNotifier = new Subject<any>();
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
      this.groupPostsNewCount = this.messageService.unreadFilterNumber(this.currentUser.userName, data);
    });
    this.messageService.teamMessages.subscribe((data) => {
      this.teamBlastPosts = data;
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
  // //returns number of new posts
  // getGroupPostsNewNumber(arr) {
  //   let totalNumber = 0;
  //   if(arr) {
  //       for(let group of arr) {
  //         totalNumber += group.messages.length;
  //       }
  //   }
  //   return totalNumber;
  // }
  // getTeamPosts(arr) {
  //   if(arr.length === 0) {
  //     return ['Currently No Posts'];
  //   }
  //   let teamArray;
  //   if(arr) {
  //     teamArray = arr;
  //     for(let i = 0; i < teamArray.length; i++) {
  //       console.log(teamArray[i].userName, this.authService.currentUserProfile.userName);
  //       if(teamArray[i].userName === this.authService.currentUserProfile.userName) {
  //         teamArray.splice(i, 1);
  //
  //       }
  //     }
  //   }
  //   return arr;
  // }


}
