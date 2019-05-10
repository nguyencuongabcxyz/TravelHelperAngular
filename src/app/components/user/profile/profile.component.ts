import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './../../../services/user.service'
import { User } from './../../../models/user'
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { WriteReferenceModalComponent } from './../reuse/write-reference-modal/write-reference-modal.component'
import { SendMessageModalComponent } from '../reuse/send-message-modal/send-message-modal.component';
import { SendRequestModalComponent } from '../reuse/send-request-modal/send-request-modal.component';
import { SendReportModalComponent } from '../reuse/send-report-modal/send-report-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', './../../../app.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild(WriteReferenceModalComponent) writeReferenceModal: WriteReferenceModalComponent;
  @ViewChild(SendMessageModalComponent) sendMessageModal: SendMessageModalComponent;
  @ViewChild(SendRequestModalComponent) sendRequestModal: SendRequestModalComponent;
  @ViewChild(SendReportModalComponent) sendReportModal: SendReportModalComponent;
  isUser: boolean;
  isFriend: boolean;
  user: any = {};
  isdrop;
  constructor(public router: Router, public service: UserService, public activatedRoute: ActivatedRoute, private toast: ToastrService) { }
  ngOnInit() {

    this.isUser = this.service.getisUser();
    this.user = this.activatedRoute.snapshot.data.users;
    //console.log(temp)
    if (!this.isUser)
      this.isFriend = this.activatedRoute.snapshot.data.isFriend.isFriend;
    // if (temp.err == '404') {
    //   this.router.navigate(['Users/People/404']);
    // } else {
    //   this.user = temp;
    // }
    console.log(this.user.id)
  }
  sendFriendRequest() {
    this.isdrop = false;
    let body = {
      message: ""
    }
    this.service.sendFriendRequest(body, this.user.id).subscribe(
      res => {
        if (res.status == 200) {
          this.toast.success("You had sent a friend request ");
        } else {
          this.toast.error("Fail")
        }

      },
      err=>{
        this.toast.error("Your Friend request had been ignored or waiting for accept")
      }
    )
  }
  removeFriend(){
    this.isdrop = false;
    this.isFriend=false;
    this.service.removeFriend(this.user.id).subscribe(
      res=>{
        this.toast.success("Remove Friend Successed ");
      }
    )
  }
}
