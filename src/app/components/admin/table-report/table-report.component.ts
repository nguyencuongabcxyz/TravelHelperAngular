import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { url } from 'inspector';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table-report',
  templateUrl: './table-report.component.html',
  styleUrls: ['./table-report.component.css']
})
export class TableReportComponent implements OnInit {
  list: any[];
  id = 0;
  img = '/assets/imgs/avatar.png';
  urlCur;


  constructor(
    private adminService: AdminService,
    private router: Router,
    private _dataService: DataService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.urlCur = this.router.url;
    this.load();
  }

  async load(){
    this.list = await this.adminService.getAllReport(this.id).toPromise().catch(err => {
      console.log(err);
    });
    if(this.urlCur !== '/Admin/Report'){
      this.list = this.list.slice(0, 3);
    }
  }

  async onClickPending(id) {
    // document.getElementById(id).style.opacity = '0.5';
    // document.getElementById('btn' + id).className = 'btn-success btn';
    // document.getElementById('btn' + id).innerText = 'Solved';
    await this.adminService.changeStateReport(id).toPromise().catch(err =>  err);
    this.load();
  }



  async onClickLock(id) {
    var lock = await this.adminService.banUser(id).toPromise().catch(err =>  {console.log(err)});
    this.load();
    if(lock) {
      this.toastr.success('Success', 'Ban User');
    }
    else {
      this.toastr.error('Ban user failed', 'Error');
    }
    if(this.urlCur !== '/Admin/Report'){
      this._dataService.onClickDel(true);
    }
  }

  async onClickDelete(id) {
    var del = await this.adminService.deleteReport(id).toPromise().catch(err => err);
    this.load();
    if(!del){
      this.toastr.success('Success', 'Delete report');
    }
    else {
      this.toastr.error('Delte report failed', 'Error');
    }
    if(this.urlCur !== '/Admin/Report'){
      this._dataService.onClickDel(true);
    }
  }

  async onClickSeeMore(){
    this.id++;
    var newLisst = await this.adminService.getAllReport(this.id).toPromise().catch(err => {
      console.log(err);
    });
    this.list = this.list.concat(newLisst)
  }

  onClickUser(id) {
    this.router.navigate([`/Users/People/${id}`]);
  }
}
