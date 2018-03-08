import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import {MaterializeModule} from "angular2-materialize";
import {AppRoutingModule} from "./app-routing";
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { BannerComponent } from './dashboard/banner/banner.component';
import { GroupPostsComponent } from './dashboard/group-posts/group-posts.component';
import { IndividualPostsComponent } from './dashboard/individual-posts/individual-posts.component';
import { CreatePostComponent } from './dashboard/create-post/create-post.component';
import { MainScreenViewComponent } from './dashboard/main-screen-view/main-screen-view.component';
import { TeamPostsComponent } from './dashboard/team-posts/team-posts.component';
import {HttpClientModule} from "@angular/common/http";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DashboardComponent,
    SidebarComponent,
    BannerComponent,
    GroupPostsComponent,
    IndividualPostsComponent,
    CreatePostComponent,
    MainScreenViewComponent,
    TeamPostsComponent,
  ],
  imports: [
    MaterializeModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
