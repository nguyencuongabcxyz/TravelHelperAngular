import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { PublicTrip } from '../models/publictrip';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private peopleid: string;
  constructor(private http: HttpClient) { }
  readonly BaseURI = 'https://travelhelperwebsite.azurewebsites.net/api';
  searchHost = '/Users/Search?address=';
  searchTraveler = '/Publictrips/Search?destination=';
  userPublicTrip = '/Users/Publictrips';
  publicTrip = '/Publictrips/';
  changePass = '/ApplicationUser/ChangePassword';

  setPeopleid(id) {
    this.peopleid = id;
  }
  getisUser() {
    return this.peopleid ? false : true;
  }
  getUser(): Observable<any> {
    if (this.getisUser())
      return this.getUserProfile();
    return this.getPeopleProfile(this.peopleid);
  }
  getProfilePublictrip(): Observable<any> {
    if (this.getisUser())
      return this.getUserPublicTrips();
    return this.getPeoplePublicTrips(this.peopleid);
  }
  getHome(): Observable<any> {
    if (this.getisUser())
      return this.getUserHome();
    return this.getPeopleHome(this.peopleid);
  }
  getReferences(): Observable<any> {
    if (this.getisUser())
      return this.getUserReferences();
    return this.getPeopleReferences(this.peopleid);
  }
  getImages(): Observable<any> {
    if (this.getisUser())
      return this.getUserImages();
    return this.getPeopleImages(this.peopleid);
  }
  //  =============================
  getTraveRequest(): Observable<any> {
    return this.http.get<any>(this.BaseURI + '/Users/TravelRequests');
  }
  sendRequest(body, id): Observable<any> {
    return this.http.post<any>(this.BaseURI + '/TravelRequests/' + id, body, { reportProgress: true, observe: "response" });
  }
  acceptRequest(id): Observable<any> {
    return this.http.put<any>(this.BaseURI + '/TravelRequests/' + id, { reportProgress: true, observe: "response" });
  }
  ignoreRequest(id): Observable<any> {
    return this.http.delete<any>(this.BaseURI + '/TravelRequests/' + id, { reportProgress: true, observe: "response" });
  }
  //=============================
  getHostOffer(): Observable<any> {
    return this.http.get<any>(this.BaseURI + '/Users/HostOffers');
  }
  sendHostOffer(body, id): Observable<any> {
    return this.http.post<any>(this.BaseURI + '/HostOffers/' + id, body, { reportProgress: true, observe: "response" });
  }
  acceptHostOffer(id): Observable<any> {
    return this.http.put<any>(this.BaseURI + '/HostOffers/' + id, { reportProgress: true, observe: "response" });
  }
  ignoreHostOffer(id): Observable<any> {
    return this.http.delete<any>(this.BaseURI + '/HostOffers/' + id, { reportProgress: true, observe: "response" });
  }
  //  =============================
  getUserProfile(): Observable<any> {
    return this.http.get<any>(this.BaseURI + '/Users');
  }
  getPeopleProfile(id: String): Observable<any> {
    return this.http.get<any>(this.BaseURI + '/Users/' + id).pipe(
      catchError(
        err => {
          return of({ 'err': err.status, 'id': id });
        }
      ));
  }
  //  =============================
  getUserHome(): Observable<any> {
    return this.http.get<any>(this.BaseURI + '/Users/Homes');
  }
  getPeopleHome(id): Observable<any> {
    return this.http.get<any>(this.BaseURI + '/Users/' + id + '/Homes');
  }

  //  =============================
  getUserPublicTrips(): Observable<any[]> {
    return this.http.get<any[]>(this.BaseURI + '/Users/Publictrips');
  }
  getPeoplePublicTrips(id): Observable<any[]> {
    return this.http.get<any[]>(this.BaseURI + '/Users/' + id + '/Publictrips');
  }
  //  =============================

  getUserReferences(): Observable<any> {
    return this.http.get<any>(this.BaseURI + '/Users/References');
  }
  getPeopleReferences(id): Observable<any> {
    return this.http.get<any>(this.BaseURI + '/Users/' + id + '/References');
  }
  //  =============================
  getUserImages(): Observable<any> {
    return this.http.get<any>(this.BaseURI + '/Users/Images');
  }
  getPeopleImages(id): Observable<any> {
    return this.http.get<any>(this.BaseURI + '/Users/' + id + '/Images');
  }
  //  =============================
  uploadPhotos(image): Observable<any> {
    return this.http.post<any>(this.BaseURI + '/Images', image, { reportProgress: true, observe: "events" });
  }
  uploadAvatar(image): Observable<any> {
    return this.http.post<any>(this.BaseURI + '/Users/Avatar', image, { reportProgress: true, observe: "events" });
  }
  deletePhoto(imageId): Observable<any> {
    return this.http.delete<any>(this.BaseURI + '/Images/' + imageId, { reportProgress: true, observe: "response" });
  }
  //  =============================
  sendReference(formReference): Observable<any> {
    return this.http.post<any>(this.BaseURI + '/References/' + this.peopleid, formReference);
  }

  //  =============================
  getPublicTrips(): Observable<any[]> {
    return this.http.get<any[]>(this.BaseURI + '/Publictrips');
  }
  //  =============================

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
  //  =============================
  getPlaces(): Observable<any[]> {
    return this.http.get<any[]>('assets/db.json')
  }
  //  =============================

  editProfileAbout(formAbout) {
    return this.http.put(this.BaseURI + '/Users', formAbout);
  }
  editProfileHome(formHome, homeId) {
    return this.http.put(this.BaseURI + '/homes/' + homeId, formHome);
  }
  createProfileHome(formHome) {
    return this.http.post(this.BaseURI + '/homes', formHome);
  }
  //  =============================


  getHostByAddress(address): Observable<any[]> {
    // console.log(this.API + this.Search + address);

    return this.http.get<User[]>(this.BaseURI + this.searchHost + address);
  }

  getTravelerByAddress(address): Observable<PublicTrip[]> {
    return this.http.get<PublicTrip[]>(this.BaseURI + this.searchTraveler + address);
  }

  getPublicTripUser(): Observable<PublicTrip[]> {
    return this.http.get<PublicTrip[]>(this.BaseURI + this.userPublicTrip);
  }

  getPublicTripById(id: number): Observable<Trip> {
    return this.http.get<Trip>(this.BaseURI + this.publicTrip + id);
  }

  putPublicTripById(id: number, publicTrip): Observable<Trip> {
    return this.http.put<Trip>(this.BaseURI + this.publicTrip + id, publicTrip);
  }

  postPublicTrip(publicTrip): Observable<any[]> {
    return this.http.post<any[]>(this.BaseURI + this.publicTrip, publicTrip);
  }

  deletePublicTripById(id: number) {
    return this.http.delete(this.BaseURI + this.publicTrip + id);
  }

  changePassword(password): Observable<any> {
    return this.http.put(this.BaseURI + this.changePass, password, { reportProgress: true, observe: "response" });
  }
}
