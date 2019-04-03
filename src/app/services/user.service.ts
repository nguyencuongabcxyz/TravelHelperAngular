import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private id: string;
  constructor(private http: HttpClient) { }
  readonly BaseURI = 'https://travelhelperwebsite.azurewebsites.net/api';
  Search = '/Users/Search?address=';

  setUser(id) {
    this.id = id;
  }
  getisUser() {
    return this.id ? false : true;
  }
  getUser(): Observable<any> {
    if (this.id == null)
      return this.getUserProfile();
    return this.getPeopleProfile(this.id);

  }

  getPeopleProfile(id: String): Observable<any> {
    return this.http.get<any>(this.BaseURI + '/Users/' + id);
  }
  getUserProfile(): Observable<any> {
    return this.http.get<any>(this.BaseURI + '/Users');
  }
  getPublicTrips(): Observable<any[]> {
    return this.http.get<any[]>(this.BaseURI + '/Publictrips');
  }
  getAdressEntries(term: string): Observable<string[]> {
    if (term.length < 1)
      return of();
    return this.http.get<string[]>(this.BaseURI + '/Address/' + term);

  }
  getAdress(terms: Observable<string>): Observable<string[]> {
    return terms.pipe(debounceTime(100),
      // distinctUntilChanged(),
      switchMap(term => this.getAdressEntries(term)))
  }
  editProfileAbout(formAbout) {
    return this.http.put(this.BaseURI + '/Users', formAbout);
  }
  editProfileHome(formHome){
    return this.http.put(this.BaseURI + '/homes', formHome);
  }
  createProfileHome(formHome){
    return this.http.post(this.BaseURI + '/homes', formHome);
  }
  getHostByAddress(address): Observable<any[]> {
    // console.log(this.API + this.Search + address);
    return this.http.get<any[]>(this.BaseURI + this.Search + address);
  }
  
}
