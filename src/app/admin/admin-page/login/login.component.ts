import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../shared/admin.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this._fb.group({
    username: [''],
    password: ['']
  });

  constructor(private _fb: FormBuilder, private _service: AdminService, private _router: Router) { }

  ngOnInit(): void {
  }


  Login() {
    this._router.navigateByUrl('admin/adminHome')
  }
}
