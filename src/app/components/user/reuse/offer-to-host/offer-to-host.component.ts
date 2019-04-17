import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { User } from 'src/app/models/user';
import { Trip } from 'src/app/models/trip';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-offer-to-host',
  templateUrl: './offer-to-host.component.html',
  styleUrls: ['./offer-to-host.component.css']
})
export class OfferToHostComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  @Input() trip: Trip;
  modalRef: any;
  user;
  constructor(private modalService: NgbModal, private service: UserService) { }

  ngOnInit() {

  }
  open() {
    this.service.getPeopleProfile(this.trip.applicationUserId).subscribe(
      res => {
        this.user = res;
        this.modalRef = this.modalService.open(this.content, { size: 'lg', windowClass: 'modal-holder' });
      }
    );
    
  }
  send(offerForm) {
    console.log(offerForm.value)
  }

}
