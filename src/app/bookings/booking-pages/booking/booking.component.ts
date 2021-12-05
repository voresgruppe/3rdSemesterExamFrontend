import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {CustomerService} from "../../../shared/customer.service";
import {Customer} from "../../../shared/customer.model";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

$customers: Customer[] | undefined;
$loggedCustomer: Customer | undefined;


  appointmentForm = this._fb.group({
    hairstyle: [''],
    date: [''],
    employee: [''],
  });

  customerForm = this._fb.group({
    name: [''],
    phoneNumber: [''],
    email: [''],
  });

  constructor(private _fb: FormBuilder, private _customerService: CustomerService) { }

  ngOnInit(): void {
    this._customerService.getCustomers().subscribe(c=> this.$customers = c)
  }


  checkPhone() {
    let phone = (<HTMLInputElement>document.getElementById("phoneNumber")).value;

    if(this.$customers) {
      for (let c of this.$customers) {
        if(c.phoneNumber == phone){
          this.$loggedCustomer = c;
        }
      }
    }

    return this.$loggedCustomer != undefined;
  }

  CreateCustomer() {
    const customer = this.customerForm.value as Customer;
    let createdCustomer: Customer | undefined;
    this._customerService.createCustomer(customer).pipe(
      tap(c=>{
        if(c){
          createdCustomer=c;
          (<HTMLInputElement>document.getElementById("phoneNumber")).value =c.phoneNumber;
        }})).subscribe(c=> this.$customers?.push(c));

  }
}
