import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./../services/user.service";

@Injectable()
export class UserResolve implements Resolve<any> {
    constructor(private service: UserService) { }

    resolve(): Observable<any> {
        return this.service.getUserProfile();
    }
}
@Injectable()
export class ProfileResolve implements Resolve<any> {
    constructor(private service: UserService) { }

    resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<any> {
        let id = activatedRouteSnapshot.paramMap.get('id');
        this.service.setUser(id);
        return this.service.getUser();
    }
} 
