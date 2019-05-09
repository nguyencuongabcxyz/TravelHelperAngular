import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UserService } from './../../services/user.service';
import { Router, Event, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgProgressComponent } from '@ngx-progressbar/core'
import { con, dis, hubConnection } from './../../models/global'
import { ToastrService } from 'ngx-toastr';
import { userInfo } from 'os';
import { HeaderComponent } from './header/header.component';
import { HubConnection } from '@aspnet/signalr';
@Component({
  selector: '.app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css', './../../app.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    // hubConnection.off('sendChatMessage');
    dis();

  }
  private hubConnection: HubConnection;
  token: String = localStorage.getItem("token");
  receiveMessage;
  isNoty = false;
  user;
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;
  navigationSubscription;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private toast: ToastrService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {

    this.user = this.activatedRoute.snapshot.data.users;
    con();
    hubConnection.on('sendChatMessage', (from: string, fullName, avatar, message: string) => {
      console.log(from + ":" + message)
      if (!this.router.url.includes("/Users/Message"))
        if (from != this.user.id) {
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

  }
  onActivate(event) {
    window.scroll(0, 0);
  }
  // receive() {
  //   hubConnection.on('sendChatMessage', (from: string, message: string) => {
  //     console.log(from + ":" + message)
  //   });
  // }

}
