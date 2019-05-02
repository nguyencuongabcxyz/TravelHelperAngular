import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    this.navigationSubscription.unsubscribe();
  }
  navigationSubscription;
  friends: User[] = [];
  isLoading = true;
  constructor(private service: UserService,private router:Router) { }

  ngOnInit() {
    this.navigationSubscription = this.router.events.subscribe(
      e => {
        if (e instanceof NavigationEnd) {
          this.load();
        }
      }
    );

    this.load();
  }
  load() {
    this.isLoading = true;
    this.service.getUserFriends().subscribe(
      res => {
        this.friends = res;
        this.isLoading = false;
      }
    )
  }
}
