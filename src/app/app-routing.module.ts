// modules
import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages/pages.routing';
import { RouterModule, Routes } from '@angular/router';

// components
import { NoPagesFoundComponent } from './no-pages-found/no-pages-found.component';
import { AuthRoutingModule } from './auth/auth.routing';

const routes: Routes = [
  // path: ''  => PagesRotingModule
  // path '/login' && '/register' => AuthRoutingModule
  {
    path: '',
    redirectTo: '/dashboard', // localhost:4200/ => localhost:4200/dashboard - path: dashboard
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NoPagesFoundComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule, // importar el sistema de rutas de los demás modulos
    AuthRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
