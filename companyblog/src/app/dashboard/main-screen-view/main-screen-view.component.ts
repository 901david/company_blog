import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {MessageServiceService} from "../../message-service.service";
import {Subject} from "rxjs/Subject";
import {AuthServiceService} from "../../auth-service.service";

@Component({
  selector: 'app-main-screen-view',
  templateUrl: './main-screen-view.component.html',
  styleUrls: ['./main-screen-view.component.css']
})
export class MainScreenViewComponent implements OnInit {
  currentTeam: User[];
  groupMessages: {};
  currentUser: {};
  modalStatus: boolean = false;
  teamMessages: any;
  modalNotifier = new Subject<boolean>();
  currentTeamHasNewMessages: boolean = false;
  groupMessagesContainUnreads: boolean = false;
  @Input() sideBarNotifier: Subject<any>;

  currentlySelectedPost: {} = {
    avatar: "https://avatars1.githubusercontent.com/u/26396882?v=4",
    bio: "I am a full-stack developer with a heavy interest in creating and consuming API's as well as creating unique and logical UI/UX.",
    body: "# should be h1↵## should be h2↵* maybe↵* a↵* list?↵```↵function(str) {↵console.log(str);↵};",
    displayName: "David Hammond",
    email: "vdavidhammond@gmail.com",
    fid: "-L7DxGMk59nk_09mCbvp",
    id: "26396882",
    likes: 0,
    messages: [],
    profileUrl: "https://github.com/901david",
    title: "Markdown Test",
    userName: "901david"
  };

  constructor(private messageService: MessageServiceService,
              private authService: AuthServiceService) { }

  ngOnInit() {
    this.messageService.unreadTeamMessages.subscribe((data) => {
      this.currentTeam = data;
      this.currentTeamHasNewMessages = this.groupMemberHaveAnyUnreads(this.currentTeam);

    });
    this.messageService.unreadGroupMessages.subscribe((data) => {
      this.groupMessages = data;
      this.groupMessagesContainUnreads = this.groupMemberHaveAnyUnreads(this.groupMessages);
    });
    this.messageService.unreadTeamBlasts.subscribe((data) => {
      this.teamMessages = data;
    });
    this.currentUser = this.authService.currentUserProfile;
    // this.sideBarNotifier.subscribe((data) => {
    //   this.outerOpenModal(data.person, data.post, data.type);
    // });
  }
  //controls the click handler for the child modal & passes the post/person data
  outerOpenModal(person, post, type) {
    console.log(type);
    this.currentlySelectedPost =  {
      ...person,
      ...post,
    };
    this.modalNotifier.next(true);
    this.modalStatus = true;
    console.log('current post in parent', this.currentlySelectedPost);
    //handle marking the post as viewed
    const viewedBy = this.currentlySelectedPost.hasOwnProperty('viewedBy') ? this.currentlySelectedPost['viewedBy'] : [];
    const fid = this.currentlySelectedPost['fid'];
    const userName = this.currentlySelectedPost['userName'];
    this.messageService.messageViewHandler(fid, this.authService.currentUserProfile.userName, userName, viewedBy, type, this.authService.currentUserProfile.avatar);
  }

  markAsRead(type, fid, viewedBy, user, avatar, author) {
    this.messageService.messageViewHandler(fid, user, author, viewedBy, type, avatar);
    this.messageService.getMessages();
  }
  //This function will determine if any team members have unreads at all
  groupMemberHaveAnyUnreads(array) {
    for(let user of array) {
      if(user['messages'] && user['messages'].length !== 0) {
        return true;
      }
    }
    return false;
  }
}

