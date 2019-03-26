import { Component, OnInit } from '@angular/core';
import { UserService} from './../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css','./../../app.component.css']
})
export class UserComponent implements OnInit {
  userDetails;
  constructor(private router: Router, private service: UserService) { }
  ngOnInit() {
    // this.service.getUserProfile().subscribe(
    //   res => {
    //     this.userDetails = res;
    //     console.log(this.userDetails.email);
    //   },
    //   err => {
    //     console.log(err);
    //   },
    // );
  }

}
