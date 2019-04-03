import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PublicTrip } from 'src/app/models/publictrip';


@Component({
  selector: 'app-pubic-trip-content',
  templateUrl: './pubic-trip-content.component.html',
  styleUrls: ['./pubic-trip-content.component.css']
})
export class PubicTripContentComponent implements OnInit {

  @Input() PublicTrip: PublicTrip;
  @Input() stt: number;

  @Output() idTrip: EventEmitter<number> = new EventEmitter<number>();
  @Output() idTripDelete: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    this.PublicTrip = {trip: {...this.PublicTrip}, user: this.PublicTrip.user};
    console.log({a: this.PublicTrip});
  }

  onPublicTripClick() {
    this.idTrip.emit(this.PublicTrip.trip.publicTripId);
  }

  onDeleteTripClick() {
    this.idTripDelete.emit(this.PublicTrip.trip.publicTripId);
  }
}
