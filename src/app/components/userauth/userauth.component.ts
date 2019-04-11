import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-userauth',
  templateUrl: './userauth.component.html',
  styleUrls: ['./userauth.component.css', './../../app.component.css']
})
export class UserauthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onActivate(event) {
    window.scroll(0, 0);
  }
}
