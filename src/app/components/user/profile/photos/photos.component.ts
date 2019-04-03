import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './../../../../services/user.service'
import { User } from './../../../../models/user'
import { Router, ActivatedRoute } from '@angular/router'
import {UploadComponent} from './../../reuse/upload/upload.component'
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css','./../../../../app.component.css']
})
export class PhotosComponent implements OnInit {
  @ViewChild(UploadComponent) upload:UploadComponent;
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
