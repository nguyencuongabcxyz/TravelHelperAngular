import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { PublicTrip } from 'src/app/models/publictrip';

@Component({
  selector: 'app-search-host',
  templateUrl: './search-host.component.html',
  styleUrls: ['./search-host.component.css', './../../../app.component.css']
})
export class SearchHostComponent implements OnInit, OnDestroy {


  address: string;
  subscriptionParams: Subscription;
  subscription: Subscription;
  hosts: User[] ;
  travelers: PublicTrip[];
  length: number;

// tslint:disable-next-line: no-shadowed-variable
  constructor(private activate: ActivatedRoute, private UserService: UserService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.subscriptionParams = this.activate.queryParams.subscribe(data => {
      console.log(data);
      this.address = data.location;
      if(data.type === 'host'){
        this.subscription = this.UserService.getHostByAddress(this.address).subscribe(users => {
          this.hosts = users;
          this.length = this.hosts.length;
        });
      } else {
        this.subscription = this.UserService.getTravelerByAddress(this.address).subscribe(trip => {
          this.travelers = trip;
          this.length = this.travelers.length;
          this.hosts = null;
        });
      }
    });
  }



  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
    if(this.subscriptionParams) {
      this.subscriptionParams.unsubscribe();
    }
  }
}
