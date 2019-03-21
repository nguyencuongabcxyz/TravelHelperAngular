import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isDashboard = true;
  isProfile = false;
  isMessage = false;
  isRequest = false;
  curentStatus = { color: '#ED6504', 'border-bottom': 'solid 4px #ED6504 ' };
  constructor(public router: Router, public activatedRoute: ActivatedRoute) {

  }
  ngOnInit() {
    this.activatedRoute.url.subscribe((url: any) => {
      if (this.router.url === "/Users/Dashboard") {
        this.isDashboard = true;
        this.isProfile = false;
        this.isMessage = false;
        this.isRequest = false;
      } else if (this.router.url === "/Users/Profile") {
        this.isDashboard = false;
        this.isProfile = true;
        this.isMessage = false;
        this.isRequest = false;
      } else if (this.router.url === "/Users/Message") {
        this.isDashboard = false;
        this.isProfile = false;
        this.isMessage = true;
        this.isRequest = false;
      } else if (this.router.url === "/Users/Request") {
        this.isDashboard = false;
        this.isProfile = false;
        this.isMessage = false;
        this.isRequest = true;
      }
    });


  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/Userauth']);
  }
  isMenu=false;
  isSearch=false;
  hideMenu(){
    this.isMenu =false;
  }
  menuClick() {
    this.isMenu = !this.isMenu;
    this.isSearch = false;
  }
  searchClick() {
    this.isSearch = !this.isSearch;
    this.isMenu =false;
  }
}
