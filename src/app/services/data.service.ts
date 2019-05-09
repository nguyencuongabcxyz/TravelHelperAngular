import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _clickDelSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  ClickDel$: Observable<boolean> = this._clickDelSubject.asObservable();

  onClickDel(value){
    this._clickDelSubject.next(value);
  }

  constructor() { }
}
