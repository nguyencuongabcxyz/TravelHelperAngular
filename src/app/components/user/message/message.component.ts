import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  city;
  select;
  constructor(public router: Router, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(
      (params : any) => {
        this.select=params.get('type');
        this.city=params.get('location');
      }
    );
  }

}
