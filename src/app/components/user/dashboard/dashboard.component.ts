import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css','./../../../app.component.css']
})
export class DashboardComponent implements OnInit {
  status_value='NOTACEPTING';

  constructor() { }

  ngOnInit() {
  }

}
