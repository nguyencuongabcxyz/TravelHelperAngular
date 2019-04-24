import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-send-report-modal',
  templateUrl: './send-report-modal.component.html',
  styleUrls: ['./send-report-modal.component.css']
})
export class SendReportModalComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  @Input() people: User;
  modalRef: any;
  isdiable;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {

  }
  open() {
    this.isdiable = false;
    this.modalRef = this.modalService.open(this.content, { windowClass: 'modal-holder' });
  }
  send(reportForm) {
    this.isdiable = true;
    console.log(reportForm.value)
  }

}
