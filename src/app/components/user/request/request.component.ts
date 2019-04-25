import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import {UploadComponent} from './../reuse/upload/upload.component'
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
@ViewChild(UploadComponent) upload:UploadComponent;
  constructor(private modalService: NgbModal,private service:UserService) { }

  ngOnInit() {
    this.service.getHostOffer().subscribe(
      res=>{
        console.log(res)
      }
    );
    this.service.getTraveRequest().subscribe(
      res=>{
        console.log(res)
      }
    )
  }
}
