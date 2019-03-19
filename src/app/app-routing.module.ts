import { NgModule } from '@angular/core';
import{AuthGuard} from './auth/auth.guard'
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { UserauthComponent } from './components/userauth/userauth.component';
import { SigninComponent } from './components/userauth/signin/signin.component';
import { SignupComponent } from './components/userauth/signup/signup.component';
const routes: Routes = [
  { path: '', redirectTo: '/Userauth/SignIn', pathMatch: 'full' },
  {
    path: 'Userauth', component: UserauthComponent,
    children: [
      { path: '', redirectTo: '/Userauth/SignIn', pathMatch: 'full' },
      { path: 'SignUp', component: SignupComponent },
      { path: 'SignIn', component: SigninComponent }
    ]
  },
  {
    path: 'Users', component: UserComponent,canActivate:[AuthGuard],
    children: [
      { path: '', redirectTo: '/Users/Dashboard', pathMatch: 'full' },
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'Profile', component: DashboardComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
