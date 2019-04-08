import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { NgProgressComponent } from '@ngx-progressbar/core'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css', './../../app.component.css']
})
export class UserComponent implements OnInit {
 
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(
      (routerEvent: Event) => {
        if (routerEvent instanceof NavigationStart) {
          this.progressBar.start();
        }
        if (routerEvent instanceof NavigationEnd) {
          this.progressBar.complete();
        }
      }
    );

  }
  onActivate(event) {
    window.scroll(0,0);
}
}
