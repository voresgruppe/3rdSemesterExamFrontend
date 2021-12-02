import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth-page/login/login.component";
import {EmployeeHomeComponent} from "./auth-page/employee-home/employee-home.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'ehome', component: EmployeeHomeComponent,  canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
