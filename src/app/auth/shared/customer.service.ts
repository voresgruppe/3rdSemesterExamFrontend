import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {Customer} from "./customer.model";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CustomerService{

  constructor(private _http: HttpClient) { }

  getCustomers(): Observable<Customer[]>{
    return this._http.get<Customer[]>(`${environment.api}/Customer`)
  }

  getCustomerById(id: number): Observable<Customer>{
    return this._http.get<Customer>(`${environment.api}/Customer/${id}`)
  }
}
