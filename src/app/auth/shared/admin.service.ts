import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from './admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http : HttpClient) { }

  getAdmins(): Observable<Admin[]>{
    return this._http.get<Admin[]>(`${environment.api}/Admin`)
  }


}
