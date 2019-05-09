import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user: any = {};
  img = '/assets/imgs/profile-picture-placeholder.png';
  constructor(private service: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.load();
  }
  async load(){
    this.user = await this.service.getUserProfile().toPromise().catch(err => {console.log(err)});
  }
}
