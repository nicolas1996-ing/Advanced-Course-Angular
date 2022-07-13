import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public imgUrl = '';
  public user: User | undefined;
  private _userSubscription!: Subscription;

  constructor(private userService: UsersService, private route: Router) {
    this.getProfile();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._userSubscription && this._userSubscription.unsubscribe();
  }

  logout() {
    this.userService.logout();
    this.route.navigateByUrl('/login');
  }

  welcome() {
    console.log('hola mundo');
  }

  getProfile() {
    this._userSubscription = this.userService.userBehavior.subscribe((user) => {
      this.user = user;
      this.imgUrl = this.userService.getImgProfile();
    });
  }
}
