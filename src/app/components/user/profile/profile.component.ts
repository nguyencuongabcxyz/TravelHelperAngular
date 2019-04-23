import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './../../../services/user.service'
import { User } from './../../../models/user'
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { WriteReferenceModalComponent } from './../reuse/write-reference-modal/write-reference-modal.component'
import { SendMessageModalComponent } from '../reuse/send-message-modal/send-message-modal.component';
import { SendRequestModalComponent } from '../reuse/send-request-modal/send-request-modal.component';
import { SendReportModalComponent } from '../reuse/send-report-modal/send-report-modal.component';

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
  user: any = {};
  constructor(public router: Router, public service: UserService, public activatedRoute: ActivatedRoute) { }
  ngOnInit() {

    this.isUser = this.service.getisUser();
    let temp = this.activatedRoute.snapshot.data.users;
    if (temp.err == '404')
      this.router.navigate(['/Users/' + temp.id]);
    else {
      this.user = temp;
    }
  }

}
