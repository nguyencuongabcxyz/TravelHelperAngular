import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { UserService } from "./../services/user.service";

@Injectable()
export class TokenResolve implements Resolve<any> {
    constructor(private service: UserService, private route: Router) { }

    resolve(): void {
        if (localStorage.getItem('token') != null)
            this.route.navigateByUrl('/Users');

    }
}
@Injectable()
export class UserResolve implements Resolve<any> {
    constructor(private service: UserService) { }

    resolve(): Observable<any> {
        return this.service.getUserProfile();
    }
}
@Injectable()
export class HomeResolve implements Resolve<any> {
    constructor(private service: UserService) { }

    resolve(): Observable<any> {
        return this.service.getUserHome();
    }
}
@Injectable()
export class PlacesDashboardResolve implements Resolve<any> {
    constructor(private service: UserService) { }

    resolve(): Observable<any> {
        return this.service.getPlaces();
    }
}
@Injectable()
export class ProfileResolve implements Resolve<any> {
    constructor(private service: UserService, private route: Router) { }

    resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<any> {

        let id = activatedRouteSnapshot.paramMap.get('id');
        this.service.setPeopleid(id);
        this.service.getUserProfile().subscribe(
            res => {
                if (res.id == id)
                    this.route.navigate(["/Users/Profile"]);
            }
        );
        
        return this.service.getUser();
    }
} 
