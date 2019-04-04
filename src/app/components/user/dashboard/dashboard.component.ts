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
      }
    );
  }
  onKeyup() {
    this.searchedSubject.next(this.textInput);
  }
  onSubmit(form) {
    this.router.navigate(['/Users/Search'], { queryParams: { type: 'host', location: form.value.input } });
  }
}
