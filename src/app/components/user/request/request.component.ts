import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import {UploadComponent} from './../reuse/upload/upload.component'
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
@ViewChild(UploadComponent) upload:UploadComponent;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
}
