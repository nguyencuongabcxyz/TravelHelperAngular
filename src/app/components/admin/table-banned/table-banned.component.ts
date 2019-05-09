import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-table-banned',
  templateUrl: './table-banned.component.html',
  styleUrls: ['./table-banned.component.css']
})
export class TableBannedComponent implements OnInit {
  list;
  urlCur;
  img = '/assets/imgs/avatar.png';
  
  constructor(private adminService: AdminService, private router: Router, private _dataService: DataService) { }

  ngOnInit() {
    this.urlCur = this.router.url;
    this.load();
    this._dataService.ClickDel$.subscribe(value => {
      if(value && this.urlCur !== '/Admin/Ban'){
        this.load();
      }
    })
  }

  async load(){
    this.list = await this.adminService.getAllUserBan().toPromise().catch(err => {console.log(err)});
    if(this.urlCur !== '/Admin/Ban'){
      this.list = this.list.slice(0, 3);
    }
  }

  async onClickActive(id) {
    var a = await this.adminService.openUser(id).toPromise().catch(err => err);
    console.log(a);
    this.load();
  }

  async onClickSeeMore(){
    this.list = await this.adminService.getAllUserBan().toPromise().catch(err => {console.log(err)});
  }
}
