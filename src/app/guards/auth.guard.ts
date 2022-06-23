import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UsersService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // función que retorna un observable
    return this.userService.tokenValidator().pipe(
      tap((resp) => {
        if (!resp) {
          console.log('guard activate')
          this.router.navigateByUrl('/login');
        }
      })
    );


    // por debajo hace la subscripción al servicio
  }
}
