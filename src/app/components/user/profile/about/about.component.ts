import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UserService } from './../../../../services/user.service'
import { User } from './../../../../models/user'
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router'
import { OfferToHostComponent } from '../../reuse/offer-to-host/offer-to-host.component';
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
  
  @ViewChild(OfferToHostComponent) offerToHost:OfferToHostComponent;
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
  openofferToHostModal(event){
    
    
      this.offerToHost.open(event);

    
  }
}
