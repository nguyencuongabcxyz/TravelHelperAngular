import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { con } from 'src/app/models/global';
class Data {
  type?;
  select?;
}
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],

})

export class ActivityComponent implements OnInit {
  // type: string = 'travelrequest';
  // select = 'received';
  items: any[];
  isLoading;
  navigationSubscription;
  data: Data = { type: 'notification' };
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private service: UserService, private toast: ToastrService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      res => {
        // console.log(this.data)
        //  console.log(res)
        if (res.type) {
          if (!res.select) {
            let temp: Data = { type: res.type, select: 'received' }
            this.data = temp;
            //console.log(123)
          } else {
            this.data = res;
          }
        }
        console.log(this.data)
        this.getItem(this.data.type, this.data.select)
      }
    );

  }
  getItem(type, select) {
    this.isLoading = true;
    this.items = [];

    switch (type) {
      case 'notification': {
        this.service.getNotification().subscribe(
          res => {
            this.isLoading = false;
            this.items = res;
            console.log(this.items)
          }
        )
        break;
      }
      case 'travelrequest': {
        if (select == 'received') {
          this.service.getTraveRequest().subscribe(
            res => {
              this.items = res;
              this.isLoading = false;
              console.log(this.items)
            }
          );
        } else if (select == 'sent') {
          this.service.getSentTraveRequest().subscribe(
            res => {
              this.items = res;
              this.isLoading = false;
              console.log(this.items)
            }
          );
        } else {
          this.isLoading = false;
        }
        break;
      }
      case 'hostoffer': {
        if (select == 'received') {
          this.service.getHostOffer().subscribe(
            res => {
              this.items = res;
              this.isLoading = false;
              console.log(this.items)
            }
          );
        } else if (select == 'sent') {
          this.service.getSentHostOffer().subscribe(
            res => {
              this.items = res;
              this.isLoading = false;
              console.log(this.items)
            }
          );
        } else {
          this.isLoading = false;
        }
        break;
      }
      case 'friendrequest': {
        if (select == 'received') {
          this.service.getFriendRequest().subscribe(
            res => {
              this.items = res;
              this.isLoading = false;
              console.log(this.items)
            }
          )
        } else if (select == 'sent') {
          this.service.getSentFriendRequest().subscribe(
            res => {
              this.items = res;
              this.isLoading = false;
              console.log(this.items)
            }
          )
        } else {
          this.isLoading = false;
        }
        break;
      }
      default: {
        this.isLoading = false;
        break;
      }
    }
  }
  // getItem(type, select) {
  //   this.isLoading = true;
  //   this.items = [];
  //   if (select == 'received') {
  //     if (type == 'travelrequest') {
  //       this.service.getTraveRequest().subscribe(
  //         res => {
  //           this.items = res;
  //           this.isLoading = false;
  //           console.log(this.items)
  //         }
  //       );
  //     }
  //     else if (type == 'hostoffer') {
  //       this.service.getHostOffer().subscribe(
  //         res => {
  //           this.items = res;
  //           this.isLoading = false;
  //           console.log(this.items)
  //         }
  //       );
  //     }
  //     else if (type == 'friendrequest') {
  //       this.service.getFriendRequest().subscribe(
  //         res => {
  //           this.items = res;
  //           this.isLoading = false;
  //           console.log(this.items)
  //         }
  //       )
  //     } else {
  //       this.isLoading = false;
  //     }
  //   } else if (select == 'sent') {
  //     if (type == 'travelrequest') {
  //       this.service.getSentTraveRequest().subscribe(
  //         res => {
  //           this.items = res;
  //           this.isLoading = false;
  //           console.log(this.items)
  //         }
  //       );
  //     }
  //     else if (type == 'hostoffer') {
  //       this.service.getSentHostOffer().subscribe(
  //         res => {
  //           this.items = res;
  //           this.isLoading = false;
  //           console.log(this.items)
  //         }
  //       );
  //     }
  //     else if (type == 'friendrequest') {
  //       this.service.getSentFriendRequest().subscribe(
  //         res => {
  //           this.items = res;
  //           this.isLoading = false;
  //           console.log(this.items)
  //         }
  //       )
  //     } else {
  //       this.isLoading = false;
  //     }
  //   } else if (!select) {
  //     if (type == 'notification') {
  //       this.service.getNotification().subscribe(
  //         res => {
  //           this.isLoading = false;
  //           this.items = res;
  //           console.log(this.items)
  //         }
  //       )
  //     } else {
  //       this.isLoading = false;
  //       this.items = [];
  //     }
  //   } else {
  //     this.isLoading = false;
  //     this.items = [];
  //   }
  // }

  onAction(event) {
    if (event.type == 'ignore') {
      if (this.data.type == 'travelrequest') {
        this.service.ignoreRequest(event.id).subscribe(
          res => {
            if (res.status == 204) {
              this.toast.success('Deleted')
              this.items = this.items.filter(item => item.travelRequestId !== event.id);
            } else {
              this.toast.success('Fail')
            }
          }
        );
      } else if (this.data.type == 'hostoffer') {
        this.service.ignoreHostOffer(event.id).subscribe(
          res => {
            if (res.status == 204) {
              this.toast.success('Deleted')
              this.items = this.items.filter(item => item.hostOfferId !== event.id);
            } else {
              this.toast.success('Fail')
            }
          }
        );
      } else if (this.data.type == 'friendrequest') {
        this.service.ignoreFriendRequest(event.id).subscribe(
          res => {
            if (res.status == 204) {
              this.toast.success('Deleted')
              this.items = this.items.filter(item => item.friendRequestId !== event.id);
            } else {
              this.toast.success('Fail')
            }
          }
        );
      }
    } else if (event.type == 'delete') {
      this.service.deleteNotification(event.id).subscribe(
        res => {
          if (res.status == 204) {
            this.toast.success('Deleted')
            this.items = this.items.filter(item => item.id !== event.id);
          } else {
            this.toast.success('Fail')
          }
        }
      )
    } else if (event.type == 'acceptfriend') {
      // console.log(event)
      this.service.acceptFriendRequest(event.id).subscribe(
        res => {
          this.toast.success('Accepted')
          this.items = this.items.filter(item => item.friendRequestId !== event.id);

        }
      );
    } else if (event.type == 'cancel') {
      console.log(event)
      if (this.data.type == 'travelrequest') {
        this.service.cancelRequest(event.id).subscribe(
          res => {
              this.toast.success('Canceled')
              this.items = this.items.filter(item => item.travelRequestId !== event.id);
          }
        );
      } else if (this.data.type == 'hostoffer') {
        this.service.cancelHostOffer(event.id).subscribe(
          res => {
              this.toast.success('Canceled')
              this.items = this.items.filter(item => item.hostOfferId !== event.id);
           
          }
        );
      } else if (this.data.type == 'friendrequest') {
        this.service.cancelFriendRequest(event.id).subscribe(
          res => {
              this.toast.success('Canceled')
              this.items = this.items.filter(item => item.friendRequestId !== event.id);
            
          }
        );
      }
    }

  }
}
