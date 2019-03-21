import { NgModule } from '@angular/core';
import{AuthGuard} from './auth/auth.guard'
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { UserauthComponent } from './components/userauth/userauth.component';
import { SigninComponent } from './components/userauth/signin/signin.component';
import { SignupComponent } from './components/userauth/signup/signup.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { MessageComponent } from './components/user/message/message.component';
import { RequestComponent } from './components/user/request/request.component';
import { NotfoundComponent } from './components/notfound.component';
const routes: Routes = [
  
  { path: '', redirectTo: '/Userauth/SignIn', pathMatch: 'full' },
  {
    path: 'Userauth', component: UserauthComponent,
    children: [
      { path: '', redirectTo: '/Userauth/SignIn', pathMatch: 'full' },
      { path: 'SignUp', component: SignupComponent },
      { path: 'SignIn', component: SigninComponent },
      { path: '**', component: NotfoundComponent },
    ]
  },
  {
    path: 'Users', component: UserComponent,canActivate:[AuthGuard],
    children: [
      { path: '', redirectTo: '/Users/Dashboard', pathMatch: 'full' },
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'Profile', component: ProfileComponent },
      { path: 'Message', component: MessageComponent },
      { path: 'Request', component: RequestComponent },
      { path: '**', component: NotfoundComponent },
    ]
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
