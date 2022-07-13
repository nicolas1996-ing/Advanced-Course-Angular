import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  menuItems: any[] | undefined;
  showMenu: boolean = false;
  showDashboard: boolean = false;
  public user: User | undefined;
  public imgUrl = '';
  private _userSubscription!: Subscription;

  constructor(
    private sidebarService: SidebarService,
    private route: Router,
    private userService: UsersService
  ) {
    this.menuItems = sidebarService.menu;
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

  getProfile() {
    this._userSubscription = this.userService.userBehavior.subscribe((resp) => {
      this.user = resp;
      this.imgUrl = this.userService.getImgProfile();
    });
  }

  showMenuItems() {
    this.showMenu = !this.showMenu;
  }
  showDashboardItems() {
    this.showDashboard = !this.showDashboard;
  }
}
