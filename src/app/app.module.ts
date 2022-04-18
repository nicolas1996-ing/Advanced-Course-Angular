import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

// modules
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ComponentsModule } from './components/components.module';
import { AppRoutingModule } from './app-routing.module';

import { NoPagesFoundComponent } from './no-pages-found/no-pages-found.component';

@NgModule({
  declarations: [AppComponent, NoPagesFoundComponent],
  imports: [BrowserModule, AppRoutingModule ,PagesModule, SharedModule, AuthModule, ComponentsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
