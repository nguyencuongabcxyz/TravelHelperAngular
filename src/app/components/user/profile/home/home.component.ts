import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from './../../../../services/user.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','./../../../../app.component.css']
})
export class HomeComponent implements OnInit {
  isUser:boolean;
  user: any = {};
  constructor(public router: Router, public service: UserService, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.service.getUser().subscribe(
      res=>{
        this.user=res;
      }
    );
    this.isUser=this.service.getisUser();
  }

}
