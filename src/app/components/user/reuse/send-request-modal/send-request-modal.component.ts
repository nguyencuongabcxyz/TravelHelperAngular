import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-send-request-modal',
  templateUrl: './send-request-modal.component.html',
  styleUrls: ['./send-request-modal.component.css']
})
export class SendRequestModalComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  @Input() people: User;
  modalRef: any;
  now = new Date();
  isdiable;
  constructor(private modalService: NgbModal, private servive: UserService, private toast: ToastrService) { }

  ngOnInit() {

  }
  open() {
    this.isdiable = false;
    this.modalRef = this.modalService.open(this.content, { windowClass: 'modal-holder' });
  }
  send(requestForm) {
    //console.log(requestForm.value)
    this.isdiable = true;
    this.servive.sendRequest(requestForm.value, this.people.id).subscribe(
      res => {
        if (res.status == 200)
          this.toast.success('You had sent a request');
        else {
          this.toast.error('Fail');
        }
        this.modalRef.close();
      }
    );
  }

}
