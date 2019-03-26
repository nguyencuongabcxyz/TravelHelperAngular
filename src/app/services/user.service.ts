import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = 'https://travelhelperwebsite.azurewebsites.net/api';
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
    return terms.pipe(debounceTime(400),
      // distinctUntilChanged(),
      switchMap(term => this.getAdressEntries(term)))
  }
  editProfileAbout(formAbout) {
    return this.http.put(this.BaseURI + '/Users', formAbout);
  }
}
