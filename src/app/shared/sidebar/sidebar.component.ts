import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  menuItems: any[] | undefined;
  constructor(
    private sidebarService: SidebarService,
    private route: Router,
    private userService: UsersService
  ) {
    this.menuItems = sidebarService.menu;
  }

  ngOnInit(): void {}

  logout() {
    this.userService.logout();
    this.route.navigateByUrl('/login');
  }
}
