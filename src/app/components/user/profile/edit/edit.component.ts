import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { User } from './../../../../models/user'
import { UserService } from './../../../../services/user.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { Subject } from 'rxjs'
import { Router, ActivatedRoute } from '@angular/router'
import { UploadComponent } from './../../reuse/upload/upload.component'
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css', './../../../../app.component.css']
})
export class EditComponent implements OnInit {
 
  @ViewChild('search') search: ElementRef;
  @ViewChild(UploadComponent) upload: UploadComponent;
  issearch = false;
  user: any = {};
  addressInput = '';
  isabout;
  private searchedSubject = new Subject<string>();
  formabout: FormGroup = this.fbabout.group({
    status: '',
    fullName: ['',Validators.required],
    address: '',
    gender: '',
    birthday: '',
    occupation: '',
    fluentLanguage: '',
    learningLanguage: '',
    about: '',
    interest: ''
  });
  formhome: FormGroup = this.fbhome.group({
    maxGuest: null,
    preferedGender: null,
    sleepingArrangement: null,
    sleepingDescription: null,
    transportationAccess: null,
    allowedThing: null,
    stuff: null,
    additionInfo: null
  });
  constructor(public route: Router, public fbhome: FormBuilder, public fbabout: FormBuilder,
    public service: UserService, public toastr: ToastrService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.isabout = true;
    this.user = this.activatedRoute.snapshot.data.users;
    this.setvalueabout();
    if (this.user.home)
      this.setvaluehome();


  }
  setvalueabout() {
    this.formabout.setValue({
      status: (this.user.status == null ? false : this.user.status),
      fullName: this.user.fullName,
      address: this.user.address,
      gender: this.user.gender,
      birthday: (this.user.birthday == null ? null : this.user.birthday.substring(0, 10)),
      occupation: this.user.occupation,
      fluentLanguage: this.user.fluentLanguage,
      learningLanguage: this.user.learningLanguage,
      about: this.user.about,
      interest: this.user.interest
    });
  }
  onKeyup() {
    this.searchedSubject.next(this.addressInput);
  }
  onSaveabout() {
    this.service.editProfileAbout(this.formabout.value).subscribe(
      (res: any) => {
        this.toastr.success("Saved");
        this.route.navigateByUrl('/Users/Profile');
      },

    );
  }
  showsearch() {
    this.issearch = true;
    setTimeout(() => {
      this.search.nativeElement.focus();
    }, 0);
  }
  setvaluehome() {
    this.formhome.setValue({
      maxGuest: this.user.home.maxGuest,
      preferedGender: this.user.home.preferedGender,
      sleepingArrangement: this.user.home.sleepingArrangement,
      sleepingDescription: this.user.home.sleepingDescription,
      transportationAccess: this.user.home.transportationAccess,
      allowedThing: this.user.home.allowedThing,
      stuff: this.user.home.stuff,
      additionInfo: this.user.home.additionInfo
    });
  }
  onSavehome() {
    if (this.user.home) {

      this.service.editProfileHome(this.formhome.value, this.user.home.homeId).subscribe(
        (res: any) => {
          this.toastr.success("Saved");
          this.route.navigateByUrl('/Users/Profile');
        },
      );
    } else {
      this.service.createProfileHome(this.formhome.value).subscribe(
        (res: any) => {
          this.toastr.success("Saved");
          this.route.navigateByUrl('/Users/Profile');
        },

      );
    }
  }

}
