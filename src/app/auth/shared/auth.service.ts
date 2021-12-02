import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginDto} from "./login.dto";
import {Observable} from "rxjs";
import {TokenDto} from "./token.dto";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  login(loginDto: LoginDto): Observable<TokenDto>{
    return this._http.post<TokenDto>(environment.api + '/auth/login', loginDto)
  }
}
