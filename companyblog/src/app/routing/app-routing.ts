import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {MainComponent} from "../main/main.component";
import {MainScreenViewComponent} from "../dashboard/main-screen-view/main-screen-view.component";
import {CreatePostComponent} from "../dashboard/create-post/create-post.component";
import {AuthGuardService} from "../services/auth-guard.service";


const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService],
  children: [
    { path: '', component: MainScreenViewComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
    { path: 'create', component: CreatePostComponent, canActivate: [AuthGuardService] },
  ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {

}
