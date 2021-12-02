import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../shared/admin.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/auth.service";
import {LoginDto} from "../../shared/login.dto";
import {take} from "rxjs/operators";

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
  jwt: string | null | undefined;

  constructor(private _fb: FormBuilder, private _auth: AuthService, private  _router: Router) {
    _auth.isLoggedIn$.subscribe(jwt =>{
      this.jwt = jwt;
    });
  }

  ngOnInit(): void {
  }


  login() {
    const loginDto = this.loginForm.value as LoginDto;
    this._auth.login(loginDto)
      .subscribe(token =>{
        if(token && token.jwt){
          this._router.navigateByUrl('auth/ehome')
        }
        //console.log('Token: ', token)
      });

  }

  logout() {
    this._auth.logout()
      .subscribe(loggedOut=>{
        this._router.navigateByUrl('auth')
    })
  }
}
