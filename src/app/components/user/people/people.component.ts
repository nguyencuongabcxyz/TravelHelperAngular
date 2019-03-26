import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../services/user.service'
import { Router, ActivatedRoute } from '@angular/router'
import { User } from './../../../models/user'
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css', './../../../app.component.css']
})
export class PeopleComponent implements OnInit {
  user: User = {};
  constructor(public router: Router, public service: UserService, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.service.getPeopleProfile(id).subscribe(
      res => {
        this.user = res;
        console.log(res);
      }
    );
  }

}
