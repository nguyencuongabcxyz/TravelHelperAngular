import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd, Event } from '@angular/router';
import { con, dis, hubConnection } from './../../models/global'
import { NgProgressComponent } from '@ngx-progressbar/core';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.navigationSubscription.unsubscribe();
    this.destroyComponent = true;
  }
  destroyComponent
  isNoty = false;
  user: any = {};
  img = '/assets/imgs/profile-picture-placeholder.png';
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;
  navigationSubscription;
  constructor(private service: UserService, private activatedRoute: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    if (!hubConnection)
      con();
    else {
      console.log(hubConnection.state)
      if (hubConnection.state == 0) {
        con();
      }
    }
    hubConnection.on('sendChatMessage', (from: string, fullName, avatar, message: string) => {
      if (!this.destroyComponent)
        if (from != this.user.id) {
          console.log(from + ":" + message)
          this.isNoty = true;
          // this.toast.show(message, fullName, { toastClass: "message-toast" });
          this.cdr.detectChanges();
        }
    })
    this.navigationSubscription = this.router.events.subscribe(
      (routerEvent: Event) => {
        if (routerEvent instanceof NavigationStart) {
          this.progressBar.start();
        }
        if (routerEvent instanceof NavigationEnd) {
          this.progressBar.complete();
        }
      }
    );
    this.load();
  }
  async load() {
    // this.user = await this.service.getUserProfile().toPromise().catch(err => {console.log(err)});
    this.user = this.activatedRoute.snapshot.data.users;
  }
}
