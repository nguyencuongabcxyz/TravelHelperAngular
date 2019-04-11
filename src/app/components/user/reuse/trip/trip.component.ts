import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, AfterViewInit, AfterContentInit } from '@angular/core';
import { Trip } from './../../../../models/trip'
@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
 
  @Input() trip: Trip;
  @Input() isUser: boolean;
  @ViewChild('des') des: ElementRef;
  height;
  show = false;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.onResize(event);
    }, 0);
  }
  onResize(event){
    this.height = this.des.nativeElement.offsetHeight / 16;
    this.show = (this.height > 6);
  }
}
