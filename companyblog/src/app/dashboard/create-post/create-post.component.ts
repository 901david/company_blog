import { Component, OnInit } from '@angular/core';
import {BlogPostModel} from "../../models/blog-post.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
  providers: []
})
export class CreatePostComponent implements OnInit {
  blogForm: FormGroup;
  groups: string[] = null;
  blogPost: BlogPostModel;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    if(localStorage.getItem('savedDraft')){
      const savedDraft = JSON.parse(localStorage.getItem('savedDraft'));
      this.initializeForm(savedDraft.title, savedDraft.body);
      this.groups = savedDraft.groups;


    }
    else {
      this.initializeForm();
    }
    console.log(this.groups);
  }
  initializeForm(titleText = '', bodyText = '') {
    this.blogForm = this.formBuilder.group({
      title: [titleText, Validators.required],
      body: [bodyText, Validators.required]
    })
  }
  onPost() {
  const { title, body } = this.blogForm.value;
  this.blogPost = {
    title,
    body,
    likes: 0,
    groups: this.groups,
    viewedBy: []
  }
  console.log(this.blogPost);
  localStorage.removeItem('savedDraft');
  }
  onSave() {
    const { title, body } = this.blogForm.value;
    const savedPost = {
      title,
      body,
      groups: this.groups
    };
    localStorage.setItem('savedDraft', JSON.stringify(savedPost));
  }
  onToggle(groupName) {
    if(!this.groups) {
      this.groups = [groupName];
    }
    else if(this.groups.indexOf(groupName) !== -1) {
      this.groups.splice(this.groups.indexOf(groupName), 1);
    }
    else {
      this.groups.push(groupName);
    }
  }
}
