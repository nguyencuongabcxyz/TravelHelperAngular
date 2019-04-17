import { Component, OnInit, Input ,ViewChild,ElementRef} from '@angular/core';
import { PublicTrip } from './../../../../models/publictrip'
import { OfferToHostComponent } from '../offer-to-host/offer-to-host.component';
@Component({
  selector: 'app-publictrip',
  templateUrl: './publictrip.component.html',
  styleUrls: ['./publictrip.component.css']
})
export class PublictripComponent implements OnInit {
  @Input() publicTrip: PublicTrip;
  @ViewChild('des') des: ElementRef;
  @ViewChild(OfferToHostComponent) offerToHost:OfferToHostComponent;
  height;
  show = false;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.onResize(event);
    }, 0);
  }
  onResize(event) {
    this.height = this.des.nativeElement.offsetHeight / 16;
    this.show = (this.height > 6);
  }

}
