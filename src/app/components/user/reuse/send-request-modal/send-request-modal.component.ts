import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { User } from 'src/app/models/user';

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
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
   
  }
  open() {
    this.isdiable=false;
    this.modalRef = this.modalService.open(this.content, {  windowClass: 'modal-holder' });
  }
  send(requestForm) {
    this.isdiable=true;
    console.log(requestForm.value)
  }

}
