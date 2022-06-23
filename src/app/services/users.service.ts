import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CreateUser,
  CreateUserResponse,
  LoginUser,
  LoginUserResponse,
} from '../models/user.model';

// declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = `${environment.baseUrl}`;
  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    localStorage.removeItem('token-angular-avanz');
    // google
    // google.accounts.id.revoke('email', () => {
    //   this.router.navigateByUrl('/login');
    // });
  }

  tokenValidator(): Observable<boolean> {
    const token = localStorage.getItem('token-angular-avanz') || '';
    return this.http
      .get<boolean>(`${this.baseUrl}/login/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token-angular-avanz', resp.JSOWebtoken);
        }),
        map((resp) => resp.success),
        catchError((error) => of(false))
      );
  }

  createUser(user: CreateUser): Observable<CreateUserResponse> {
    return this.http
      .post<CreateUserResponse>(`${this.baseUrl}/users`, user)
      .pipe(
        tap((resp) => {
          localStorage.setItem('token-angular-avanz', resp.token);
        })
      );
  }

  login(data: LoginUser): Observable<LoginUserResponse> {
    return this.http
      .post<LoginUserResponse>(`${this.baseUrl}/login`, data)
      .pipe(
        tap((resp) => {
          console.log(resp.token);
          localStorage.setItem('token-angular-avanz', resp.token);
        })
      );
  }
}
