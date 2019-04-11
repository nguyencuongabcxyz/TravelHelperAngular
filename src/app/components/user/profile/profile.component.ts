import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../services/user.service'
import { User } from './../../../models/user'
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', './../../../app.component.css']
})
export class ProfileComponent implements OnInit {
  isUser: boolean;
  user: any = {};
  constructor(public router: Router, public service: UserService, public activatedRoute: ActivatedRoute) { }
  ngOnInit() {

    this.isUser = this.service.getisUser();
    let temp = this.activatedRoute.snapshot.data.users;
    if (temp.err == '404')
      this.router.navigate(['/Users/' + temp.id]);
    else {
      this.user = temp;
    }

   



  }

}
