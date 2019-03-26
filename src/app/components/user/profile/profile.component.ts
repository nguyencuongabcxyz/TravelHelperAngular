import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../services/user.service'
import { User } from './../../../models/user'
import { Router, ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', './../../../app.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = {};
  isAbout=true;
  isMyhome=false;
  constructor(public router: Router, public service: UserService, public activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.service.getUserProfile().subscribe(
      res => {
        this.user = res;
      }
    );




  }
}
