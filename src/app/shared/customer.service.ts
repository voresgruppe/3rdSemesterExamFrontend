import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {Customer} from "./customer.model";
import {tap} from "rxjs/operators";
import {FormBuilder, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CustomerService{

  constructor(private _http: HttpClient, private _fb: FormBuilder) { }

  getCustomers(): Observable<Customer[]>{
    return this._http.get<Customer[]>(`${environment.api}/Customer`)
  }

  getCustomerById(id: number): Observable<Customer>{
    return this._http.get<Customer>(`${environment.api}/Customer/${id}`)
  }

  getCustomerByPhone(phone: string): Observable<Customer>{
    return this._http.get<Customer>(`${environment.api}/Customer/GetByPhone(${phone}`)
  }

  createCustomer(customer: Customer): Observable<Customer>{
    return this._http.post<Customer>(`${environment.api}/Customer/CreateCustomer`, customer)
  }


  getForm(){
    return this._fb.group({
      name: [''],
      phoneNumber: [''],
      email: [''],
    });
  }

  CreateCustomerByForm(customerForm: FormGroup) {
    const customer = customerForm.value as Customer;
    let createdCustomer: Customer | undefined;
    this.createCustomer(customer).pipe(
      tap(c=>{
        if(c){
          createdCustomer=c;
        }})).subscribe();
  }

}
