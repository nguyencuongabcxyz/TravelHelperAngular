import { Component, OnInit , ViewChild,ElementRef } from '@angular/core';
import { User } from './../../../../models/user'
import { UserService } from './../../../../services/user.service'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import {Subject} from 'rxjs'
import {Router} from '@angular/router'
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css', './../../../../app.component.css']
})
export class EditComponent implements OnInit{
  @ViewChild('search') search:ElementRef;

  issearch=false;
  user: User = {};
  cityNames: string[];
  addressInput='';
  isabout;
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

  constructor(public route:Router,public fb: FormBuilder, public service: UserService, public toastr: ToastrService) {

  }

  ngOnInit() {
    this.isabout=true;
    this.service.getUserProfile().subscribe(
      res => {
        this.user = res;
        this.setvalue();
      }
    );
    this.service.getAdress(this.searchedSubject).subscribe(
      res=>{
        
          this.cityNames=res;
        
        
        
      }
    );
  }
  setvalue(){
    this.formabout.setValue({
      Status: this.user.status,
      FullName: this.user.fullName,
      Address: this.user.address,
      Gender: this.user.gender,
      BirthDay: this.user.birthday.substring(0,10),
      Occupation: this.user.occupation,
      FluentLanguage: this.user.fluentLanguage,
      LearningLanguage: this.user.learningLanguage,
      About: this.user.about,
      Interest: this.user.interest
    });
  }
  onKeyup(){
    this.searchedSubject.next(this.addressInput);
    if (this.addressInput.length < 1) {
      this.cityNames = [];
    }
  }
  onSubmit() {
    this.service.editProfileAbout(this.formabout.value).subscribe(
      (res: any) => {
          this.toastr.success("Saved");
          this.route.navigateByUrl('/Users/Profile');
      },
      
    );
  }
  showsearch(){
    this.issearch=true;
    setTimeout(() => {
      this.search.nativeElement.focus();
  }, 0);
    
  }

}
