import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { User } from '../models/user';
import { PublicTrip } from '../models/publictrip';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private id: string;
  constructor(private http: HttpClient) { }
  readonly BaseURI = 'https://travelhelperwebsite.azurewebsites.net/api';
  searchHost = '/Users/Search?address=';
  searchTraveler = '/Publictrips/Search?destination=';
  // userPublicTrip = '/Users/Publictrips';
  publicTripId = '/Publictrips/';

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
  editProfileHome(formHome,homeId){
    return this.http.put(this.BaseURI + '/homes/'+homeId, formHome);
  }
  createProfileHome(formHome){
    return this.http.post(this.BaseURI + '/homes', formHome);
  }
  getHostByAddress(address): Observable<any[]> {
    // console.log(this.API + this.Search + address);

    return this.http.get<User[]>(this.BaseURI + this.searchHost + address);
  }

  getTravelerByAddress(address): Observable<PublicTrip[]> {
    return this.http.get<PublicTrip[]>(this.BaseURI + this.searchTraveler + address);
  }

  // getPublicTripUser(): Observable<PublicTrip[]> {
  //   return this.http.get<PublicTrip[]>(this.BaseURI + this.userPublicTrip);
  // }

  getPublicTripById(id: number): Observable<Trip> {
    return this.http.get<Trip>(this.BaseURI + this.publicTripId + id);
  }

  putPublicTripById(id: number, publicTrip): Observable<Trip> {
    return this.http.put<Trip>(this.BaseURI + this.publicTripId + id, publicTrip);
  }

  postPublicTrip(publicTrip): Observable<any[]> {
    return this.http.post<any[]>(this.BaseURI + '/Publictrips', publicTrip);
  }

  deletePublicTripById(id: number) {
    return this.http.delete(this.BaseURI + this.publicTripId + id);
  }
}
