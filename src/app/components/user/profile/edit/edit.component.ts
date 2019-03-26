import { Component, OnInit } from '@angular/core';
import { User } from './../../../../models/user'
import { UserService } from './../../../../services/user.service'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import {Subject} from 'rxjs'
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css', './../../../../app.component.css']
})
export class EditComponent implements OnInit {
  user: User = {};
  cityNames: string[];
  addressInput='';
  private searchedSubject = new Subject<string>();
  formabout: FormGroup = this.fb.group({
    Status: '',
    FullName: '',
    Address:'',
    Gender: '',
    BirthDay: '',
    Occupation: '',
    FluentLanguage: '',
    LearningLanguage: '',
    About: '',
    Interest: ''
  });

  constructor(public fb: FormBuilder, public service: UserService, public toastrService: ToastrService) {

  }
  isabout;
  ngOnInit() {
    this.isabout=true;
    this.service.getUserProfile().subscribe(
      res => {
        this.user = res;
        // console.log(this.user);
        this.formabout.setValue({
          Status: this.user.status,
          FullName: this.user.fullName,
          Address: this.user.address,
          Gender: this.user.gender,
          BirthDay: this.user.birthday,
          Occupation: this.user.occupation,
          FluentLanguage: this.user.fluentLanguage,
          LearningLanguage: this.user.learningLanguage,
          About: this.user.about,
          Interest: this.user.interest
        });
       
        // this.formabout = this.fb.group({
        //   Status: this.user.status,
        //   FullName: this.user.fullName,
        //   Gender: this.user.gender,
        //   BirthDay: this.user.birthday,
        //   Occupation: this.user.occupation,
        //   FluentLanguage: this.user.fluentLanguage,
        //   LearningLanguage: this.user.learningLanguage,
        //   About: this.user.about,
        //   Interest: this.user.interest
        // });
      }
    );
    this.service.getAdress(this.searchedSubject).subscribe(
      res=>{
        this.cityNames=res;
        console.log(res);
      }
    );
  }
  onKeyup(){
    this.searchedSubject.next(this.formabout.get('Address').value);
    if (this.formabout.get('Address').value.length < 1) {
      this.cityNames = [];
    }
  }
  onSubmit() {
    this.service.editProfileAbout(this.formabout.value).subscribe(
      (res: any) => {
          this.toastrService.success("Saved");
      }
    );
  }

}
