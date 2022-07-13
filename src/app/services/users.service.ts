import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CreateUser,
  CreateUserResponse,
  LoginUser,
  LoginUserResponse,
  UpdateUser,
  User,
} from '../models/user.model';

// declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = `${environment.baseUrl}`;
  userBehavior = new BehaviorSubject<User>({
    name: '',
    email: '',
    password: '',
    google: false,
    role: '',
    img: '',
    uid: '',
  });

  get token() {
    return localStorage.getItem('token-angular-avanz') || '';
  }

  get uidUser() {
    return this.userBehavior.value.uid || '';
  }
  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    localStorage.removeItem('token-angular-avanz');
    // google
    // google.accounts.id.revoke('email', () => {
    //   this.router.navigateByUrl('/login');
    // });
  }

  // esta f(x) hace parte del Guard de las rutas
  // la info del usuario siempre se actualiza
  tokenValidator(): Observable<boolean> {
    return this.http
      .get<boolean>(`${this.baseUrl}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        tap((resp: any) => {
          this.userBehavior.next(resp.user);
          localStorage.setItem('token-angular-avanz', resp.JSOWebtoken);
        }),
        map((resp) => resp.success),
        catchError((error) => of(false))
      );
  }

  getImgProfile(): string {
    // http://localhost:3005/api/uploads/users/be32bde4-284d-4c28-a0c4-38b188b494a9.jpg
    return `${this.baseUrl}/uploads/users/${
      this.userBehavior.value.img || 'no-image.jpg'
    }`;
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
          // console.log(resp.token);
          localStorage.setItem('token-angular-avanz', resp.token);
        })
      );
  }

  updateProfile(data: UpdateUser): Observable<any> {
    data = {
      ...data,
      role: this.userBehavior.value.role,
    };
    return this.http.patch<any>(`${this.baseUrl}/users/${this.uidUser}`, data, {
      headers: { 'x-token': this.token },
    });
  }
}
