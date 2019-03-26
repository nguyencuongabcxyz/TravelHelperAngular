import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-search-host',
  templateUrl: './search-host.component.html',
  styleUrls: ['./search-host.component.css']
})
export class SearchHostComponent implements OnInit, OnDestroy {


  address: string;
  API = 'https://travelhelperwebsite.azurewebsites.net/api/Users/Search?Address=';
  subscriptionParams: Subscription;
  subscription: Subscription;
  peoples: User[] ;
  length: number;

// tslint:disable-next-line: no-shadowed-variable
  constructor(private activate: ActivatedRoute, private UserService: UserService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.subscriptionParams = this.activate.queryParams.subscribe(data => {
      //console.log(data.location);
      this.address = data.location;
      this.subscription = this.UserService.getHostByAddress(this.address).subscribe(users => {
        this.peoples = users;
        this.length = this.peoples.length;
      });
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
