import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { UserauthComponent } from './components/userauth/userauth.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { SigninComponent } from './components/userauth/signin/signin.component';
import { SignupComponent } from './components/userauth/signup/signup.component';
import { HeaderComponent } from './components/user/header/header.component';
import { FooterComponent } from './components/user/footer/footer.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';

import { UserauthService } from './services/userauth.service';

import { AuthInterceptor } from './auth/auth.interceptor';
import { ProfileComponent } from './components/user/profile/profile.component';
import { MessageComponent } from './components/user/message/message.component';
import { RequestComponent } from './components/user/request/request.component';
import { NotfoundComponent } from './components/notfound.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { AboutComponent } from './components/user/profile/about/about.component';
import { PeopleComponent } from './components/user/people/people.component';
import { EditComponent } from './components/user/profile/edit/edit.component';
import { SearchHostComponent } from './components/user/search-host/search-host.component';
import { FormatDataPipe } from './pipes/format-data.pipe';







@NgModule({
  declarations: [
    AppComponent,
    UserauthComponent,
    UserComponent,
    AdminComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    SearchHostComponent,
    PeopleComponent,
    FormatDataPipe,
    ProfileComponent,
    MessageComponent,
    RequestComponent,
    NotfoundComponent,
    AboutComponent,
    EditComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:'toast-custom',
      timeOut:1000,
      progressBar: true
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    ClickOutsideModule
  ],
  providers: [UserauthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
