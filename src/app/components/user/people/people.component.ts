import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';



@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  img = '/assets/imgs/demo.jpg';
  @Input() user: any;
  language: string [];

  test = {
    fullName: 'robert downey jr',
    referenceReceived: ['a', 'b', 'c'],
    occupation: 'Actor',
    fluentLanguage: ['english', 'vietnamese'],
    about: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`
  };

  constructor() {
  }

  ngOnInit() {
// tslint:disable-next-line: max-line-length
    this.language = [this.user.fluentLanguage ? this.user.fluentLanguage : '', this.user.learningLanguage ? this.user.learningLanguage : ''];

  }

}
