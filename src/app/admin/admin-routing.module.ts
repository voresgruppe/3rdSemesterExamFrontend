import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./admin-page/login/login.component";
import {AdminHomeComponent} from "./admin-page/admin-home/admin-home.component";

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'adminHome', component: AdminHomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
