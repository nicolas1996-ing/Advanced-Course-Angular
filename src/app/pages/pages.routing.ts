// definición de rutas de pages
// ng-router + enter
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountsSettingsComponent } from './accounts-settings/accounts-settings.component';

const routes: Routes = [
  {
    // PagesComponent tiene un router-outlet
    path: 'dashboard',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },

      {
        path: 'progress', // localhost:4200/dashboard/progress
        component: ProgressComponent,
      },
      {
        path: 'chart',
        component: Grafica1Component,
      },
      { 
        path: 'account-settings',
        component: AccountsSettingsComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
