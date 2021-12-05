import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginDto} from "./login.dto";
import {BehaviorSubject, Observable, of} from "rxjs";
import {TokenDto} from "./token.dto";
import {environment} from "../../environments/environment";
import {take, tap} from "rxjs/operators";


const jwtToken = 'jwtToken';
const employeeId = 'employeeId';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn$ = new BehaviorSubject<string | null>(this.getToken());

  constructor(private _http: HttpClient) { }

  login(loginDto: LoginDto): Observable<TokenDto>{
    return this._http
      .post<TokenDto>(environment.api + '/auth/login', loginDto)
      .pipe(
        tap(token=>{
          if(token && token.jwt){
            localStorage.setItem(jwtToken, token.jwt)
            if(token.employeeId){
              localStorage.setItem(employeeId, String(token.employeeId))
            }
            this.isLoggedIn$.next(token.jwt);
          }else {
            this.logout()
          }
        })
      )
  }

  getToken(): string| null {
    return localStorage.getItem(jwtToken);
  }

  getEmployeeID(): number{
    return Number(localStorage.getItem(employeeId));
  }

  logout(): Observable<boolean> {
    localStorage.removeItem(jwtToken)
    localStorage.removeItem(employeeId)
    this.isLoggedIn$.next(this.getToken());
    return of(true).pipe(
      take(1)
    );
  }
}
