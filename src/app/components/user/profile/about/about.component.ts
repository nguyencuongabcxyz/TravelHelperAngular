import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './../../../../services/user.service'
import { User } from './../../../../models/user'
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router'
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css', './../../../../app.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.navigationSubscription.unsubscribe();
  }
  navigationSubscription;
  isUser: boolean;
  user: any = {};
  trips;
  constructor(public router: Router, public service: UserService, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.navigationSubscription = this.router.events.subscribe(
      e => {
        if (e instanceof NavigationEnd) {
          this.load();
        }
      }
    );

    this.load();
    this.isUser = this.service.getisUser();
  }

  load() {
    this.user = {};
    this.trips = null;
    this.service.getUser().subscribe(
      res => {
        this.user = res;
      }
    );
    this.service.getProfilePublictrip().subscribe(
      res => {
        this.trips = res;
      }
    );

  }
}
