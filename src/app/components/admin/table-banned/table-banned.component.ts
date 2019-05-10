import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table-banned',
  templateUrl: './table-banned.component.html',
  styleUrls: ['./table-banned.component.css']
})
export class TableBannedComponent implements OnInit {
  list;
  urlCur;
  img = '/assets/imgs/avatar.png';

  constructor(private adminService: AdminService, private router: Router, private _dataService: DataService, private toastr: ToastrService) { }

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
    var active = await this.adminService.openUser(id).toPromise().catch(err => {console.log(err)});
    this.load();
    if(active){
      this.toastr.success('Success', 'Active User');
    }
    else {
      this.toastr.error('Active failed', 'Error');
    }
    if(this.urlCur == '/Admin/Dashboard'){
      this._dataService.onClickDel(true);
    }
  }

  async onClickSeeMore(){
    this.list = await this.adminService.getAllUserBan().toPromise().catch(err => {console.log(err)});
  }
}
