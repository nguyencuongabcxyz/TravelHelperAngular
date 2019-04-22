import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { UserService } from './../../../services/user.service'
import { PublicTrip } from './../../../models/publictrip'
import { User } from './../../../models/user'
import { Router, ActivatedRoute } from '@angular/router'
import { Subject } from 'rxjs'
import { OfferToHostComponent } from '../reuse/offer-to-host/offer-to-host.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', './../../../app.component.css']
})

export class DashboardComponent implements OnInit {
  @ViewChild(OfferToHostComponent) offerToHost: OfferToHostComponent;

  percent;
  isUser = true;
  textInput = "";
  user: any = {};
  trips: any[];
  publicTrips: any[];
  constructor(private service: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }
  public searchedSubject = new Subject<string>();
  ngOnInit() {
    // this.trips=[];
    //this.user.publicTrips = [];
    this.user = this.activatedRoute.snapshot.data.users;
    let d = {
      address: this.user.address,
      gender: this.user.gender,
      birthday: this.user.birthday,
      occupation: this.user.occupation,
      fluentLanguage: this.user.fluentLanguage,
      learningLanguage: this.user.learningLanguage,
      about: this.user.about,
      interest: this.user.interest,
      status: this.user.status,
      avatarLocation: this.user.avatarLocation,
    };
    let x = Object.values(d).filter(x => (x !== null && x !== "")).length;
    this.percent = x / 10 * 100;
    this.service.getUserPublicTrips().subscribe(
      res => {
        this.trips = res;
      }
    );

    this.service.getPublicTrips().subscribe(
      res => {
        this.publicTrips = res;
      }
    );
  }
  onKeyup() {
    this.searchedSubject.next(this.textInput);
  }
  onSubmit(form) {
    console.log(form.value.input)
    this.router.navigate(['/Users/Search'], { queryParams: { type: 'host', location: form.value.input } });
  }
  openofferToHostModal(event) {
    this.offerToHost.open(event);
  }
}
