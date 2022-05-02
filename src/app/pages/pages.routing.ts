// definición de rutas de pages
// ng-router + enter
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountsSettingsComponent } from './accounts-settings/accounts-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  {
    // PagesComponent tiene un router-outlet
    path: 'dashboard',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {
          title: 'dashboard',
        },
      },

      {
        path: 'progress', // localhost:4200/dashboard/progress
        component: ProgressComponent,
        data: {
          title: 'progress',
        },
      },
      {
        path: 'chart',
        component: Grafica1Component,
        data: {
          title: 'chart',
        },
      },
      {
        path: 'account-settings',
        component: AccountsSettingsComponent,
        data: {
          title: 'account-settings',
        },
      },
      {
        path: 'promesas',
        component: PromesasComponent,
        data: {
          title: 'promises',
        },
      },
      {
        path: 'rxjs',
        component: RxjsComponent,
        data: {
          title: 'rxjs',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
