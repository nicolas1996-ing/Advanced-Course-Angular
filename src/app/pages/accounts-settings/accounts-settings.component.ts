import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-accounts-settings',
  templateUrl: './accounts-settings.component.html',
  styles: [],
})
export class AccountsSettingsComponent implements OnInit {
  public links: NodeListOf<Element> | undefined;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector'); // class about color box
    this.settingsService.checkCurrentTheme(this.links);
  }

  changeTheme(theme: string) {
    this.settingsService.changeTheme(theme, this.links);
  }
}
