import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-host',
  templateUrl: './search-host.component.html',
  styleUrls: ['./search-host.component.css']
})
export class SearchHostComponent implements OnInit {

  peoples: number[] = [1, 2, 3];

  constructor() { }

  ngOnInit() {
  }

}
