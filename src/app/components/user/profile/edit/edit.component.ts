import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
  home: any;
  homeres: any;
  addressInput = '';
  isabout;
  private searchedSubject = new Subject<string>();
  formabout: FormGroup = this.fbabout.group({
    status: '',
    fullName: ['', Validators.required],
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
    public service: UserService, public toastr: ToastrService, private activatedRoute: ActivatedRoute, private cdr:ChangeDetectorRef) {

  }

  ngOnInit() {
    this.activatedRoute.fragment.subscribe(
      fragment=>{
        this.isabout = fragment == 'about'|| fragment == null ? true : false;
      }
    )
    //this.onClick();
    this.user = this.activatedRoute.snapshot.data.users;
    this.homeres = this.activatedRoute.snapshot.data.homeres;
    this.setvalueabout();
    if (this.homeres.length) {
      this.home = this.homeres[0];
      this.setvaluehome();
    }
  }
  // onClick() {
    
  //   setTimeout(() => {
  //     let hash = this.route.url.substring(this.route.url.indexOf('#') + 1);
  //     this.isabout = hash == 'about' || hash == '/Users/Profile/Edit' ? true : false;
  //   }, 0);

  // }
  setAvatar(event) {
    this.user.avatarLocation = event;
    this.cdr.detectChanges();
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
  isdiable=false;
  onSaveabout() {
    this.isdiable=true;
    console.log(this.isdiable)
    this.service.editProfileAbout(this.formabout.value).subscribe(
      (res: any) => {
        this.toastr.success("Saved");
        // setTimeout(() => {
        //   this.isdiable=false;
        // }, 1000);
        
        this.route.navigateByUrl('/Users/Profile');
      },

    );
  }
  showsearch() {
    this.issearch = true;
    this.addressInput = "";
    setTimeout(() => {
      this.search.nativeElement.focus();
    }, 0);
  }
  setvaluehome() {
    //this.isdiable=true;
    this.formhome.setValue({
      maxGuest: this.home.maxGuest,
      preferedGender: this.home.preferedGender,
      sleepingArrangement: this.home.sleepingArrangement,
      sleepingDescription: this.home.sleepingDescription,
      transportationAccess: this.home.transportationAccess,
      allowedThing: this.home.allowedThing,
      stuff: this.home.stuff,
      additionInfo: this.home.additionInfo
    });
  }
  onSavehome() {
    this.isdiable=true;
    if (this.home) {
      this.service.editProfileHome(this.formhome.value, this.home.homeId).subscribe(
        (res: any) => {
          this.toastr.success("Saved");
          this.route.navigateByUrl('/Users/Profile/Myhome');
        },
      );
    } else {
      this.service.createProfileHome(this.formhome.value).subscribe(
        (res: any) => {
          this.toastr.success("Saved");
          this.route.navigateByUrl('/Users/Profile/Myhome');
        },

      );
    }
  }

}
