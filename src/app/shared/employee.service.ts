import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http : HttpClient) { }

  getEmployees(): Observable<Employee[]>{
    return this._http.get<Employee[]>(`${environment.api}/Employee`)
  }

  getEmployeeById(id: number){
    return this._http.get<Employee>(`${environment.api}/Employee/${id}`)
  }


}
