/*
  email: name-test-angular-1@gmail.com
  password: name-test-angular-1
*/

import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
declare const gapi: any;
declare const jwt_decode: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formSubmitted: boolean = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false],
  });
  auth2: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.loginForm
      .get('email')
      ?.setValue(localStorage.getItem('email-angular-avanz'));
    this.renderButton();
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe({
      next: (resp) => {
        // console.log(resp);
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem(
            'email-angular-avanz',
            this.loginForm.get('email')?.value
          );
        } else {
          localStorage.removeItem('email-angular-avanz');
        }
        this.router.navigateByUrl('/'); // dashboard
      },
      error: (e) => {
        Swal.fire({
          title: e.error.message,
          text: 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
      complete: () => console.info('complete'),
    });
  }

  // ----------------------google sign in----------------------
  // ----------------------------------------------------------
  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });
    this.startApp();
  }

  startApp() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '243441817704-196j3p78itliltl9cu2u0ruk60p5n9ee.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  }

  attachSignin(element: any) {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser: any) => {
        const token = googleUser.getAuthResponse().id_token;
        console.log(token);
      },
      (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
}
