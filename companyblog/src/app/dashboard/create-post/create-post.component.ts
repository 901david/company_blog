import { Component, OnInit } from '@angular/core';
import {BlogPostModel} from "../../models/blog-post.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthServiceService} from "../../auth-service.service";
import {Router} from "@angular/router";
import * as firebase from 'firebase';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
  providers: []
})
export class CreatePostComponent implements OnInit {
  blogForm: FormGroup;
  groups: string[] = [];
  blogPost: BlogPostModel;
  teamBlast: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthServiceService,
              private router: Router) { }

  ngOnInit() {
    //If user has a draft saved from previous session we want to re-instate that
    if(localStorage.getItem('savedDraft')){
      const savedDraft = JSON.parse(localStorage.getItem('savedDraft'));
      this.initializeForm(savedDraft.title, savedDraft.body);
      this.groups = savedDraft.groups;
      this.teamBlast = savedDraft.teamBlast;
    }
    else {
      this.initializeForm();
    }
    }
  //Initializes the form for creating a post
  initializeForm(titleText = '', bodyText = '') {
    this.blogForm = this.formBuilder.group({
      title: [titleText, Validators.required],
      body: [bodyText, Validators.required]
    })
  }
  //handles the post of a blog
  onPost() {

  const { title, body } = this.blogForm.value;
  this.blogPost = {
    user: this.authService.currentUserProfile.userName,
    user_avatar: this.authService.currentUserProfile.avatar,
    title,
    body,
    likes: 0,
    groups: this.groups,
    viewedBy: []
  }
  console.log(this.blogPost);
  //If we had a draft now it has been posted so lets remove it
  localStorage.removeItem('savedDraft');
  console.log(this.groups.length);
  console.log(this.teamBlast);
  if(this.groups.length > 0) {
    this.teamBlast = false;
    for (let group of this.groups) {
      console.log(group);
      firebase.database().ref(`/groups/${group}`).push({
        ...this.blogPost,
        user: this.authService.currentUserProfile.userName,
        user_avatar: this.authService.currentUserProfile.avatar
      }).then(() => {
        this.router.navigate(['/main']);

      });
    }
  }
  else if(this.teamBlast) {
    firebase.database().ref(`/teamBlasts`).push(this.blogPost).then((data) => {
      this.router.navigate(['/main']);
    });
  }
  else {
      firebase.database().ref(`/users/${this.authService.currentUserProfile.userName}/messages`).push(this.blogPost).then(() => {
        this.router.navigate(['/main']);

      });

  }
    console.log(this.groups.length);
    console.log(this.teamBlast);
    this.blogPost = null;
  }
  //saves a draft to local storage so you can come back to it later
  onSave() {
    const { title, body } = this.blogForm.value;
    const savedPost = {
      title,
      body,
      groups: this.groups,
      teamBlast: this.teamBlast
    };
    localStorage.setItem('savedDraft', JSON.stringify(savedPost));
  }
  //controls toggle data array
  onToggle(groupName) {
    if (groupName === 'Team Blast') {
        this.teamBlast = !this.teamBlast;
        console.log(this.teamBlast);
    }
    else {
      if (!this.groups) {
        this.groups = [groupName];
      }
      else if (this.groups.indexOf(groupName) !== -1) {
        this.groups.splice(this.groups.indexOf(groupName), 1);
      }
      else {
        this.groups.push(groupName);
      }
    }
  }
}
