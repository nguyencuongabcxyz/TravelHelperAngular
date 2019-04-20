import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


import { AppComponent } from './app.component';
import { UserauthComponent } from './components/userauth/userauth.component';
import { UserComponent } from "./components/user/user.component";
import { AdminComponent } from './components/admin/admin.component';
import { SigninComponent } from './components/userauth/signin/signin.component';
import { SignupComponent } from './components/userauth/signup/signup.component';
import { HeaderComponent } from './components/user/header/header.component';
import { FooterComponent } from './components/user/footer/footer.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';

import { UserauthService } from './services/userauth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'


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
import { PublicTripComponent } from './components/user/public-trip/public-trip.component';

import { PubicTripContentComponent } from './components/user/pubic-trip-content/pubic-trip-content.component';

import { TripComponent } from './components/user/reuse/trip/trip.component';
import { PublictripComponent } from './components/user/reuse/publictrip/publictrip.component';
import { DropdownComponent } from './components/user/reuse/dropdown/dropdown.component';
import { UploadComponent } from './components/user/reuse/upload/upload.component';
import { PhotosComponent } from './components/user/profile/photos/photos.component';
import { HomeComponent } from './components/user/profile/home/home.component';
import { UserResolve ,ProfileResolve,TokenResolve,HomeResolve} from './services/user.resolve';
import { NgProgressModule } from '@ngx-progressbar/core';
import { ReferenceComponent } from './components/user/reuse/reference/reference.component';
import { ReferencesComponent } from './components/user/profile/references/references.component';
import { LoadingComponent } from './components/user/reuse/loading/loading.component';
import { WriteReferenceModalComponent } from './components/user/reuse/write-reference-modal/write-reference-modal.component';
import { SendRequestModalComponent } from './components/user/reuse/send-request-modal/send-request-modal.component';
import { SendMessageModalComponent } from './components/user/reuse/send-message-modal/send-message-modal.component';
import { OfferToHostComponent } from './components/user/reuse/offer-to-host/offer-to-host.component';
import { CarouselModalComponent } from './components/user/reuse/carousel-modal/carousel-modal.component';





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
    PublicTripComponent,
    PubicTripContentComponent,
    TripComponent,
    PublictripComponent,
    DropdownComponent,
    UploadComponent,
    PhotosComponent,
    HomeComponent,
    ReferenceComponent,
    ReferencesComponent,
    LoadingComponent,
    WriteReferenceModalComponent,
    SendRequestModalComponent,
    SendMessageModalComponent,
    OfferToHostComponent,
    CarouselModalComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-custom',
      timeOut: 1000,
      progressBar: true
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    ClickOutsideModule,
    NgbModule,
    NgProgressModule.withConfig({
      color: '#ED6504',
      spinner: false,
    }),
  ],
  providers: [UserauthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    NgbModal,
    NgbActiveModal,
    UserResolve,
    ProfileResolve,
    TokenResolve,
    HomeResolve
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
