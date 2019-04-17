import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router'
import { UserService } from './../../../../services/user.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './../../../../app.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.navigationSubscription.unsubscribe();
  }
  navigationSubscription;
  isUser: boolean;
  // user: any = {};
  isLoading=true;
  home: any;
  constructor(public router: Router, public service: UserService, public activatedRoute: ActivatedRoute) { }
  none = false;
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
  load(){
    this.isLoading=true;
    this.service.getHome().subscribe(
      res => {
        this.isLoading=false;
        if (res.length) {
          this.home = res[0];
          let x = Object.values(this.home).filter(x => (x === null || x === "")).length;
          this.none = (x >= 9);
        }
      }
    );
  }

}
