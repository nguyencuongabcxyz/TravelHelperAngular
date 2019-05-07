import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css', './../../../../app.component.css']
})
export class StatisticComponent implements OnInit {
  @Input() type: string;
  constructor() { }

  ngOnInit() {
  }

}
