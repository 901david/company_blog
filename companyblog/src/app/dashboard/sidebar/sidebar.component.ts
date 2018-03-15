import {Component, OnInit, Output} from '@angular/core';
import {AuthServiceService} from "../../auth-service.service";
import {User} from "../../models/user.model";
import {MessageServiceService} from "../../message-service.service";
import {Subject} from "rxjs/Subject";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {HttpClientTestingBackend} from "@angular/common/http/testing/src/backend";
import {HttpClient} from "@angular/common/http";

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
  unreadGroupBadgeNumbers;
  constructor(private authService: AuthServiceService,
              private messageService: MessageServiceService,
              private router: Router,
              private cookie: CookieService,
              private httpClient: HttpClient) { }

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
      this.unreadGroupBadgeNumbers = this.findNumberOfUnreadsForGroups(data);
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
  findNumberOfUnreadsForGroups(arr) {
    const newBadgeArray = {};
    for(let group of arr) {
      if(group.messages && group.messages !== 0) {
        newBadgeArray[group.groupName] = group.messages.length;
      }
    }
    return newBadgeArray;
  }
  hasThisUserSeenThis(viewArray) {
    // console.log('here is my view array', viewArray);
    if(viewArray) {
      const viewed = viewArray.reduce((user, viewer) => {
        // console.log(viewer.user, this.currentUser.userName);
        if (viewer.user === this.currentUser.userName) {
          user = viewer.user;
        }
        return user;
      }, '');

      return viewed !== '';
    }

      return false;

  }
  onLogout() {
    this.cookie.delete('currentUser');
    this.httpClient.get('http://localhost:3002/logout');
    this.router.navigate(['']);
  }

}
