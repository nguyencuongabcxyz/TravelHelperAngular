import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  type: string = 'travelrequest';
  items: any[];
  isLoading;
  navigationSubscription
  constructor(private router:Router,private activatedRoute: ActivatedRoute, private service: UserService, private toast: ToastrService) { }

  ngOnInit() {
    this.type = 'travelrequest';
    // console.log(this.type)
    this.activatedRoute.queryParams.subscribe(
      res => {
      //  console.log(res)
        if (res.type) {
          this.type = res.type;
        }
        this.getItem(this.type)
      }
    );

  }
  getItem(type) {
    this.isLoading = true;
    this.items = [];
    if (type == 'travelrequest') {
      this.service.getTraveRequest().subscribe(
        res => {

          this.items = res;
          this.isLoading = false;
          console.log(this.items)
        }
      );
    }
    if (type == 'hostoffer') {
      this.service.getHostOffer().subscribe(
        res => {

          this.items = res;
          this.isLoading = false;
          console.log(this.items)
        }
      );
    }
  }

  onAction(event) {
    if (event.type == 'ignore') {
      if (this.type == 'travelrequest') {
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
      } else if (this.type == 'hostoffer') {
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
      }
    }

  }
}
