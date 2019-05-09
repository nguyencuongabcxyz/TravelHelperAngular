import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
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
  isLoading;
  items: any[] = [];
  address: string;
  subscriptionParams: Subscription;
  subscription: Subscription;
  hosts: User[];
  travelers: PublicTrip[];
  peoples: User[];
  length: number;
  params;
  index = 0;
  nothing;
  isLoadingMore;
  // tslint:disable-next-line: no-shadowed-variable
  constructor(private activate: ActivatedRoute, private UserService: UserService, private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    this.loadData();


  }

  loadData() {

    this.subscriptionParams = this.activate.queryParams.subscribe(data => {
      this.nothing = false;
      this.isLoading = true;
      this.index = 0;
      console.log(data);
      this.params = data;
      this.address = data.data;
      if (data.type === 'host') {
        this.subscription = this.UserService.getHostByAddress(this.address, 0).subscribe(res => {
          if (res.length < 12 && res.length > 0)
            this.nothing = true;
          this.items = res;
          console.log(res)
          this.isLoading = false;
        });
      } else if (data.type === 'traveler') {
        this.subscription = this.UserService.getTravelerByAddress(this.address, 0).subscribe(res => {
          if (res.length < 12 && res.length > 0)
            this.nothing = true;
          this.items = res;
          console.log(res)
          this.isLoading = false;
        });
      }
      else {
        this.subscription = this.UserService.getUserByFullName(this.address, 0).subscribe(res => {
          if (res.length < 12 && res.length > 0)
            this.nothing = true;
          this.items = res;
          console.log(res)
          this.isLoading = false;
        })
      }
    });
  }
  loadMoreData() {
    this.isLoadingMore = true;
    this.nothing = false;
    this.index++;
    if (this.params.type === 'host') {
      this.subscription = this.UserService.getHostByAddress(this.address, this.index).subscribe(res => {
        this.isLoadingMore = false;
        if (!res.length) {
          this.nothing = true;
        }
        this.items = this.items.concat(res);
        this.cdr.detectChanges();
      });
    } else if (this.params.type === 'traveler') {
      this.subscription = this.UserService.getTravelerByAddress(this.address, this.index).subscribe(res => {
        this.isLoadingMore = false;
        if (!res.length) {
          this.nothing = true;
        }
        this.items = this.items.concat(res);
        this.cdr.detectChanges();
      });
    }
    else {
      this.subscription = this.UserService.getUserByFullName(this.address, this.index).subscribe(res => {
        this.isLoadingMore = false;
        if (!res.length) {
          this.nothing = true;
        }
        this.items = this.items.concat(res);
        this.cdr.detectChanges();
      })
    }
  }
  onScrollDown() {
    console.log("crolldown")
    this.loadMoreData();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionParams) {
      this.subscriptionParams.unsubscribe();
    }
  }
}
