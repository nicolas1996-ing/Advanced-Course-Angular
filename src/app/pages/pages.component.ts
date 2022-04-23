import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  constructor(private settingsService: SettingsService) {}
  // este servicio nos ayuda a inicializar el tema actual proveniente del LS

  ngOnInit(): void {
    customInitOption();
  }
}


function customInitOption() {}

