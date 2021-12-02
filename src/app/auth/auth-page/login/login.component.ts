import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../shared/admin.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/auth.service";
import {LoginDto} from "../../shared/login.dto";

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

  constructor(private _fb: FormBuilder, private _auth: AuthService) { }

  ngOnInit(): void {
  }


  login() {
    const loginDto = this.loginForm.value as LoginDto;
    this._auth.login(loginDto)
      .subscribe(token =>{
        console.log('Token: ', token)
      });

  }
}
