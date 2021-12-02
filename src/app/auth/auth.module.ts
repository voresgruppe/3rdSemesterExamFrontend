import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {LoginComponent} from "./auth-page/login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import { EmployeeHomeComponent } from './auth-page/employee-home/employee-home.component';


@NgModule({
  declarations: [
    LoginComponent,
    EmployeeHomeComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
