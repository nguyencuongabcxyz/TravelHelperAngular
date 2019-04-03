import { Component, OnInit, Input } from '@angular/core';
import {PublicTrip} from './../../../../models/publictrip'
@Component({
  selector: 'app-publictrip',
  templateUrl: './publictrip.component.html',
  styleUrls: ['./publictrip.component.css']
})
export class PublictripComponent implements OnInit {
 @Input() publicTrip: PublicTrip;
  constructor() { }

  ngOnInit() {
  }

}
