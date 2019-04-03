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
  isUser: boolean;
  user: any = {};
  isAbout = true;
  isMyhome = false;
  constructor(public router: Router, public service: UserService, public activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      param => {
        let id = param.get('id');
        this.service.setUser(id);
        this.service.getUser().subscribe(
          res => {
            this.user = res;
          },
          err => {
            if (err.status == 404)
              this.router.navigate(['/Users/404']);
              
          }
        );
      }
    );

    this.isUser = this.service.getisUser();





  }
  //   isActive(url): boolean {
  //     return this.router.url.includes(url);
  // }
}
