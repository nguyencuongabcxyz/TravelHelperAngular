import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item-activity',
  templateUrl: './item-activity.component.html',
  styleUrls: ['./item-activity.component.css']
})
export class ItemActivityComponent implements OnInit {
  @Input() item;
  @Input() from;
  @Output() myClick = new EventEmitter();
  @ViewChild('des') des: ElementRef;

  isdiabled;
  show = false;
  height;
  constructor(private service: UserService, private toast: ToastrService) { }

  ngOnInit() {
    if (this.from != 'friendrequest')
      setTimeout(() => {
        this.onResize(event);
      }, 0);
  }
  onResize(event) {
    this.height = this.des.nativeElement.offsetHeight / 16;
    this.show = (this.height > 5);
  }
  onAccept() {
    this.isdiabled = true;

    if (this.from == 'travelrequest') {
      this.service.acceptRequest(this.item.travelRequestId).subscribe(
        res => {
          this.toast.success('Accepted')
          this.item.isAccepted = res.isAccepted;
          this.isdiabled = false;
          console.log(res)

        }
      );

    } else if (this.from == 'hostoffer') {
      this.service.acceptHostOffer(this.item.hostOfferId).subscribe(
        res => {
          this.toast.success('Accepted')
          this.item.isAccepted = res.isAccepted;
          this.isdiabled = false;
          console.log(res)

        }
      );
    }else if (this.from == 'friendrequest') {
      // let body = {
      //   type: 'acceptfriend', id: this.item.friendRequestId
      // }
      // this.myClick.emit(body);
      this.service.acceptFriendRequest(this.item.friendRequestId).subscribe(
        res => {
          this.toast.success('Accepted')
          this.item.isAccepted = res.isAccepted;
          this.isdiabled = false;
          console.log(res)

        }
      );
    }
  }

  onIgnore() {
    this.isdiabled = true;
    let id;
    if (this.from == 'travelrequest') {
      id = this.item.travelRequestId;
    } else if (this.from == 'hostoffer') {
      id = this.item.hostOfferId;
    }else if (this.from == 'friendrequest') {
      id = this.item.friendRequestId;
    }

    let body = {
      type: 'ignore', id: id
    }

    this.myClick.emit(body);
  }
}
