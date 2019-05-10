import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { UserService } from "./../services/user.service";
import { AdminService } from './admin.service';

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
        console.log(id)
        this.service.setPeopleid(id);
        this.service.getUser().subscribe(
            res => {
                if (res.err)
                    this.route.navigate(['Users/People/404']);

            }
        );
        this.service.getUserProfile().subscribe(
            res => {
                if (res.id == id)
                    this.route.navigate(["/Users/Profile"]);
            }
        )
        return this.service.getUser();
    }
}
@Injectable()
export class IsFriendResolve implements Resolve<any> {
    constructor(private service: UserService) { }

    resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<any> {
        let id = activatedRouteSnapshot.paramMap.get('id');
        return this.service.checkIsFriend(id);
    }
}
@Injectable()
export class DefaultUserChatResolve implements Resolve<any> {
    constructor(private service: UserService, private router: Router) { }

    resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
        let id = activatedRouteSnapshot.queryParamMap.get('id');
        console.log(id)
        if (id == null) {
            this.service.getListUserChat(0,1).subscribe(
                res => {
                    if (res[0]) {
                        this.router.navigate(['/Users/Message'], { queryParams: { id: res[0].id } })
                    }
                }
            )
        }

    }
}
@Injectable()
export class ListUserChatResolve implements Resolve<any> {
    constructor(private service: UserService, private router: Router) { }

    resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<any> {
        return this.service.getListUserChat(0,10000);

    }
}
@Injectable()
export class quantityUserResolve implements Resolve<any> {
    constructor(private service: AdminService, private router: Router) { }

    resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<any> {
        return this.service.getUserQuantity();

    }
}
@Injectable()
export class quantityReportResolve implements Resolve<any> {
    constructor(private service: AdminService, private router: Router) { }

    resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<any> {
        return this.service.getReportQuantity();

    }
}
@Injectable()
export class quantityBanResolve implements Resolve<any> {
    constructor(private service: AdminService, private router: Router) { }

    resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<any> {
        return this.service.getBanQuantity();

    }
}
@Injectable()
export class CurrentUserChatResolve implements Resolve<any> {
    constructor(private service: UserService, private router: Router) { }

    resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<any> {
        let id = activatedRouteSnapshot.queryParamMap.get('id');
        console.log(id)
        if (id)
            return this.service.getPeopleProfile(id);
    }
}
