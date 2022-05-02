import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [
    {
      title: 'dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
          title: 'Main',
          url: '/'
        },
        {
          title: 'progressBar',
          url: 'progress' 
        },
        {
          title: 'Graficas',
          url: 'chart'
        },
        {
          title: 'Promesas',
          url: 'promesas'
        },
        {
          title: 'Rxjs',
          url: 'rxjs'
        }
      ]
      
    }
  ]
  constructor() { }

}
