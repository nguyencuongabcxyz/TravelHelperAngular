import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './auth/auth.guard'
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from "./components/user/user.component";
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { UserauthComponent } from './components/userauth/userauth.component';
import { SigninComponent } from './components/userauth/signin/signin.component';
import { SignupComponent } from './components/userauth/signup/signup.component';

import { SearchHostComponent } from './components/user/search-host/search-host.component';

import { ProfileComponent } from './components/user/profile/profile.component';
import { MessageComponent } from './components/user/message/message.component';
import { RequestComponent } from './components/user/request/request.component';
import { NotfoundComponent } from './components/notfound.component';
import { AboutComponent } from './components/user/profile/about/about.component'
import { EditComponent } from './components/user/profile/edit/edit.component';
import { PublicTripComponent } from './components/user/public-trip/public-trip.component';
import { PhotosComponent } from './components/user/profile/photos/photos.component';
import { HomeComponent } from './components/user/profile/home/home.component';
import { ReferencesComponent } from './components/user/profile/references/references.component'

import { UserResolve, ProfileResolve, TokenResolve, HomeResolve } from './services/user.resolve'
import { ChangePassComponent } from './components/user/change-pass/change-pass.component';
const routes: Routes = [

  { path: '', redirectTo: 'Userauth', pathMatch: 'full' },
  {
    path: 'Userauth', component: UserauthComponent, resolve: { TokenResolve },
    children: [
      { path: '', redirectTo: 'SignIn', pathMatch: 'full' },
      { path: 'SignUp', component: SignupComponent },
      { path: 'SignIn', component: SigninComponent },
      { path: '**', component: NotfoundComponent },
    ]
  },
  {
    path: 'Users', component: UserComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
      { path: 'Dashboard', component: DashboardComponent, resolve: { users: UserResolve } },
      { path: 'Profile/Edit', component: EditComponent, resolve: { users: UserResolve, homeres: HomeResolve } },
      {
        path: 'Profile', component: ProfileComponent, resolve: { users: ProfileResolve },
        children: [
          { path: '', redirectTo: 'About', pathMatch: 'full' },
          { path: 'About', component: AboutComponent },
          { path: 'Myhome', component: HomeComponent },
          { path: 'Photos', component: PhotosComponent },
          { path: 'References', component: ReferencesComponent ,},
        ]
      },
      { path: 'People', redirectTo: "/Users/Profile/About", pathMatch: 'full' },
      {
        path: 'People/:id', component: ProfileComponent, resolve: { users: ProfileResolve },
        children: [
          { path: '', redirectTo: "About", pathMatch: 'full' },
          { path: 'About', component: AboutComponent },
          { path: 'Myhome', component: HomeComponent },
          { path: 'Photos', component: PhotosComponent },
          { path: 'References', component: ReferencesComponent, },
        ]
      },

      {
        path: 'Search',
        component: SearchHostComponent, resolve: { users: ProfileResolve }
      },
      {
        path: 'PublicTrip',
        component: PublicTripComponent, resolve: { users: ProfileResolve }
      },
      {
        path: 'PublicTrip/:id',
        component: PublicTripComponent, resolve: { users: UserResolve }
      },
      {
        path: 'ChangePassword',
        component: ChangePassComponent
      },


      { path: 'Message', component: MessageComponent, resolve: { users: ProfileResolve } },
      { path: 'Request', component: RequestComponent, resolve: { users: ProfileResolve } },
      { path: '404', component: NotfoundComponent },
      { path: '**', component: NotfoundComponent },

    ]
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload',useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
