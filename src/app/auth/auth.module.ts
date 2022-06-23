import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  exports: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  // El AppRoutingModule permite hacer uso del router-outlet
})
export class AuthModule {}
