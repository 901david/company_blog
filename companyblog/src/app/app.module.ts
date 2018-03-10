import { BrowserModule } from '@angular/platform-browser';
import {NgModule, OnInit} from '@angular/core';


import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import {MaterializeModule} from "angular2-materialize";
import {AppRoutingModule} from "./app-routing";
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { BannerComponent } from './dashboard/banner/banner.component';
import { CreatePostComponent } from './dashboard/create-post/create-post.component';
import { MainScreenViewComponent } from './dashboard/main-screen-view/main-screen-view.component';
import {HttpClientModule} from "@angular/common/http";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import { CookieService } from 'ngx-cookie-service';
import {AuthServiceService} from "./auth-service.service";
import {AuthGuardService} from "./auth-guard.service";
import {MessageServiceService} from "./message-service.service";
import {MarkdownModule} from "angular2-markdown";
import { ModalMarkdownComponent } from './dashboard/modal-markdown/modal-markdown.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DashboardComponent,
    SidebarComponent,
    BannerComponent,
    CreatePostComponent,
    MainScreenViewComponent,
    ModalMarkdownComponent,
  ],
  imports: [
    MaterializeModule,
    BrowserModule,
    MarkdownModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [FormBuilder,
              CookieService,
              AuthServiceService,
              AuthGuardService,
              MessageServiceService],
  bootstrap: [AppComponent]
})
export class AppModule{

}
