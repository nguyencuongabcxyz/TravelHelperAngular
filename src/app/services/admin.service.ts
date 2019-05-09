import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = 'https://travelhelperwebsite.azurewebsites.net/api';
  getReport = '/Reports?index=';
  Report = '/Reports/';
  lockUser = '/Users/Lock/';
  unLockUser = '/Users/Unlock/';
  listBan = '/Users/BannedUsers';

  getAllReport(id): Observable<any>{
    return this.http.get(this.BaseURI + this.getReport + id);
  }

  deleteReport(id): Observable<any>{
    return this.http.delete(this.BaseURI + this.Report + id);
  }

  banUser(id): Observable<any>{
    return this.http.put(this.BaseURI + this.lockUser + id, {});
  }

  openUser(id): Observable<any>{
    return this.http.put(this.BaseURI + this.unLockUser + id, {});
  }

  getAllUserBan(): Observable<any>{
    return this.http.get(this.BaseURI + this.listBan);
  }

  changeStateReport(id): Observable<any>{
    return this.http.put(this.BaseURI + this.Report + id, {});
  }
}
