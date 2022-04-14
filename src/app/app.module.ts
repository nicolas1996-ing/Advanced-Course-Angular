import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NoPagesFoundComponent } from './pages/no-pages-found/no-pages-found.component';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent, NoPagesFoundComponent],
  imports: [BrowserModule, AppRoutingModule, PagesModule, SharedModule, AuthModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
