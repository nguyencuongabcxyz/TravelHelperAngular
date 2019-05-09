import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { NgProgressComponent } from '@ngx-progressbar/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
   
  }
  title = 'TravelHelper';
 
  
  constructor(private router: Router){}
  ngOnInit(): void {
   
  }
  
}
