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
import { NotfoundComponent } from './components/notfound.component';
import { AboutComponent } from './components/user/profile/about/about.component'
import { EditComponent } from './components/user/profile/edit/edit.component';
import { PublicTripComponent } from './components/user/public-trip/public-trip.component';
import { PhotosComponent } from './components/user/profile/photos/photos.component';
import { HomeComponent } from './components/user/profile/home/home.component';
import { ReferencesComponent } from './components/user/profile/references/references.component';



import { ChangePassComponent } from './components/user/change-pass/change-pass.component';

import { UserResolve, ProfileResolve, TokenResolve, HomeResolve, PlacesDashboardResolve, IsFriendResolve, ListUserChatResolve, CurrentUserChatResolve, DefaultUserChatResolve } from './services/user.resolve';
import { FriendsComponent } from './components/user/profile/friends/friends.component';
import { ActivityComponent } from './components/user/activity/activity.component';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardAdminComponent } from './components/admin/dashboard-admin/dashboard-admin.component';
import { BoxChatComponent } from "./components/user/message/box-chat/box-chat.component";

import { ReportUserComponent } from './components/admin/report-user/report-user.component';
import { BanUserComponent } from './components/admin/ban-user/ban-user.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';


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
    path: 'Users', component: UserComponent, canActivate: [AuthGuard], resolve: { users: UserResolve },
    children: [
      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
      { path: 'Dashboard', component: DashboardComponent, resolve: { users: UserResolve, placesres: PlacesDashboardResolve } },
      { path: 'Profile/Edit', component: EditComponent, resolve: { users: UserResolve, homeres: HomeResolve } },
      {
        path: 'Profile', component: ProfileComponent, resolve: { users: ProfileResolve },
        children: [
          { path: '', redirectTo: 'About', pathMatch: 'full' },
          { path: 'About', component: AboutComponent },
          { path: 'Myhome', component: HomeComponent },
          { path: 'Photos', component: PhotosComponent },
          { path: 'References', component: ReferencesComponent },
          { path: 'Friends', component: FriendsComponent },
        ]
      },
      { path: 'People', redirectTo: "/Users/Profile/About", pathMatch: 'full' },
      { path: 'People/404', component:NotfoundComponent },
      {
        path: 'People/:id', component: ProfileComponent, resolve: { users: ProfileResolve, isFriend: IsFriendResolve },
        children: [
          { path: '', redirectTo: "About", pathMatch: 'full' },
          { path: 'About', component: AboutComponent },
          { path: 'Myhome', component: HomeComponent },
          { path: 'Photos', component: PhotosComponent },
          { path: 'References', component: ReferencesComponent },
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
        component: ChangePassComponent, resolve: { users: UserResolve }
      },

      {
        path: 'Message', component: MessageComponent,
        resolve: { user: UserResolve, DefaultUserChatResolve, listUserChats: ListUserChatResolve, }
      },
      // { path: 'Message/:id', component: MessageComponent, resolve: { users: UserResolve }},
      { path: 'Activity', component: ActivityComponent, resolve: { users: UserResolve } },
      { path: '404', component: NotfoundComponent },
      { path: '**', component: NotfoundComponent },

    ]
  },
  {
    path: 'Admin', component: AdminComponent, canActivate: [AuthGuard], data: {permittedRoles: ['Admin']},
    children: [
      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
      {
        path: 'Dashboard', component: DashboardAdminComponent
      },
      {
        path: 'Report', component: ReportUserComponent
      },
      {
        path: 'Ban', component: BanUserComponent
      },

    ]
  },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
