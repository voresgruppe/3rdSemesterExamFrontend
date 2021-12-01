import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {LoginComponent} from "./admin-page/login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import { AdminHomeComponent } from './admin-page/admin-home/admin-home.component';


@NgModule({
  declarations: [
    LoginComponent,
    AdminHomeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
