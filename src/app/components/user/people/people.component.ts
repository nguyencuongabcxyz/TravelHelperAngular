import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { PublicTrip } from 'src/app/models/publictrip';



@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css', './../../../app.component.css']
})
export class PeopleComponent implements OnInit {

  img = '/assets/imgs/demo.jpg';

  @Input() user: User;
  @Input() trip: PublicTrip;


  language: string [];



  constructor() {
  }

  ngOnInit() {
    if (this.trip) {
      console.log(this.trip);
      this.user = this.trip.user;
      this.trip.trip = {...this.trip};

    }
    //console.log(this.user, this.trip);
    this.language = [this.user.fluentLanguage ? this.user.fluentLanguage : '', this.user.learningLanguage ? this.user.learningLanguage : ''];

  }

}
