import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MainComponent} from "./main/main.component";
import {MainScreenViewComponent} from "./dashboard/main-screen-view/main-screen-view.component";
import {CreatePostComponent} from "./dashboard/create-post/create-post.component";
import {IndividualPostsComponent} from "./dashboard/individual-posts/individual-posts.component";
import {GroupPostsComponent} from "./dashboard/group-posts/group-posts.component";
import {TeamPostsComponent} from "./dashboard/team-posts/team-posts.component";


const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'dashboard', component: DashboardComponent,
  children: [
    { path: '', component: MainScreenViewComponent, pathMatch: 'full' },
    { path: 'create', component: CreatePostComponent },
    { path: 'yourposts', component: IndividualPostsComponent },
    { path: 'teamposts', component: TeamPostsComponent },
    { path: 'groupposts', component: GroupPostsComponent },
  ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {

}
