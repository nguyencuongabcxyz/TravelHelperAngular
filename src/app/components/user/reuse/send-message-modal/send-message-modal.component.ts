import { Component, OnInit ,ViewChild,ElementRef, Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-send-message-modal',
  templateUrl: './send-message-modal.component.html',
  styleUrls: ['./send-message-modal.component.css']
})
export class SendMessageModalComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  @Input() people:User;
  modalRef: any;
  isdiable;
  constructor( private modalService: NgbModal) { }

  ngOnInit() {
  
  }
  open() {
    this.isdiable=false;
    this.modalRef = this.modalService.open(this.content,{windowClass:'modal-holder'});
  }
  send(messageForm){
    this.isdiable=true;
console.log(messageForm.value)
  }

}
