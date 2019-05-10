import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css', './../../../app.component.css'],

})
export class DashboardAdminComponent implements OnInit {

  userQuantity: number;
  banQuantity: number;
  reportQuantity: number;
  urlCur;

  constructor(
    private adminService: AdminService,
    private _dataService: DataService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.load();
    this.urlCur = this.router.url;
    this._dataService.ClickDel$.subscribe(value => {
      if(value && this.urlCur == '/Admin/Dashboard'){
        this.adminService.getBanQuantity().toPromise().then(v => {
          this.banQuantity = v.quantity;
        }).catch(err => {console.log(err)});

        this.adminService.getReportQuantity().toPromise().then(v => {
          this.reportQuantity = v.quantity;
        }).catch(err => {console.log(err)});
      }
    })
  }

  load(){
    this.userQuantity = this.activeRoute.snapshot.data.quantityUser.quantity;
    this.reportQuantity = this.activeRoute.snapshot.data.quantityReport.quantity;
    this.banQuantity = this.activeRoute.snapshot.data.quantityBan.quantity;
  }
}
