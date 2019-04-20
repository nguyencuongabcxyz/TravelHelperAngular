import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PublicTrip } from 'src/app/models/publictrip';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pubic-trip-content',
  templateUrl: './pubic-trip-content.component.html',
  styleUrls: ['./pubic-trip-content.component.css']
})
export class PubicTripContentComponent implements OnInit {
  permit = true;
  @Input() PublicTrip: PublicTrip;
  @Input() stt: number;

  @Output() idTrip: EventEmitter<number> = new EventEmitter<number>();
  @Output() idTripDelete: EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router) { }

  ngOnInit() {
    this.PublicTrip = {trip: {...this.PublicTrip}, user: this.PublicTrip.user};
    console.log({a: this.PublicTrip});
  }

  onPublicTripClick() {
    if(this.permit === true) {
      this.idTrip.emit(this.PublicTrip.trip.publicTripId);
      //this.router.navigate(['/Users/PublicTrip', this.PublicTrip.trip.publicTripId]);
    }
    this.permit = true;
  }

  notOnPublicTripClick() {
    this.permit = false;
    console.log(1);
  }

  onDeleteTripClick() {
    this.idTripDelete.emit(this.PublicTrip.trip.publicTripId);
  }
}
