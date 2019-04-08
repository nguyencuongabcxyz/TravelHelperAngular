import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from './../../../../services/user.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './../../../../app.component.css']
})
export class HomeComponent implements OnInit {
  isUser: boolean;
  user: any = {};
  constructor(public router: Router, public service: UserService, public activatedRoute: ActivatedRoute) { }
  none = false;
  ngOnInit() {
    this.service.getUser().subscribe(
      res => {
        this.user = res;
        if (this.user.home) {
          let x = 0;
          for (let i of Object.values(this.user.home)) {
            if (i == null || i == '') {
              x++;
            }
          }
          this.none = (x >= 8);
        }
      }
    );
    this.isUser = this.service.getisUser();

  }

}
