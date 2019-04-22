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
  @Input() trip;
  modalRef: any;
  user;
  isdiable;
  constructor(private modalService: NgbModal, private service: UserService) { }

  ngOnInit() {
    
  }
  open(trip) {
    this.isdiable=false;
    this.trip=trip;
    this.service.getPeopleProfile(trip.applicationUserId).subscribe(
      res => {
        this.user = res;
       this.modalRef = this.modalService.open(this.content, {  windowClass: 'modal-holder' });
      }
    );
    
  }
  send(offerForm) {
    this.isdiable=true;
    console.log(offerForm.value)
  }

}
