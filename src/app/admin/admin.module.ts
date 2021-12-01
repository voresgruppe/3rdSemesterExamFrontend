import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {LoginComponent} from "./admin-page/login/login.component";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AdminHomeComponent } from './admin-page/admin-home/admin-home.component';


@NgModule({
  declarations: [
    LoginComponent,
    AdminHomeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
