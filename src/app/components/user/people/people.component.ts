import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { PublicTrip } from 'src/app/models/publictrip';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css', './../../../app.component.css']
})
export class PeopleComponent implements OnInit {

  img = '/assets/imgs/profile-picture-placeholder.png';

  @Input() user: User;
  @Input() trip: PublicTrip;
  @Input() people: User;


  language: string [];
  obj = {
    height: '230px'
  };



  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.trip) {
      console.log(this.trip);
      this.user = this.trip.user;
      this.trip.trip = {...this.trip};

    }
    if(this.people) {
      this.user = this.people;
      this.obj.height = '170px';
    }

    //console.log(this.user, this.trip);
    this.language = [this.user.fluentLanguage ? this.user.fluentLanguage : '', this.user.learningLanguage ? this.user.learningLanguage : ''];
    if(this.language[0] === '' && this.language[1] === '') {
      this.language = [];
    }
  }

  onClickPeople(){
    this.router.navigate([`/Users/People/${this.user.id}`]);
  }

}
