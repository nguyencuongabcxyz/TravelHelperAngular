import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../services/user.service'
import { PublicTrip } from './../../../models/publictrip'
import { User } from './../../../models/user'
import {Router,ActivatedRoute} from '@angular/router'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', './../../../app.component.css']
})

export class DashboardComponent implements OnInit {
  isUser=true;
  textInput = "";
  user:any={};
  publicTrips: any[] ;
  constructor(private service: UserService,private activatedRoute: ActivatedRoute,private router: Router) { }
  // cityNames: string[];
  public searchedSubject = new Subject<string>();
  ngOnInit() {
    this.user.publicTrips=[];
    this.service.getUserProfile().subscribe(
      res => {
        this.user=res;
       
      }
    );
    this.service.getPublicTrips().subscribe(
      res=> {
        this.publicTrips=res;
        //  console.log(res);
      }
    );
    // this.service.getAdress(this.searchedSubject).subscribe(
    //   res => {
    //     this.cityNames = res;
       
    //   }
    // );
  }
  onKeyup() {
    this.searchedSubject.next(this.textInput);
    // if (this.textInput.length < 1) {
    //   this.cityNames = [];
    // }
  }
  onSubmit(form) {
    // form.value.input = this.textInput;
    // this.cityNames = [];
    // console.log(form.value);
    this.router.navigate(['/Users/Search'], { queryParams: { type: 'host', location: form.value.input } });
  }
}
