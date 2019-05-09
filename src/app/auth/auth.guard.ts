import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('token') != null){
      let roles = next.data['permittedRoles'] as Array<String>;
      if(roles){
        if(this.userService.roleMatch(roles)){
          return true;
        }
        else{
          this.router.navigate(['Users/forbidden'])
        }
      }
      return true;
    }
    else {
      this.router.navigate(['/Userauth']);
      return false;
    }

  }
}
