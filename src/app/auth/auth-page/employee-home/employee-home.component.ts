import { Component, OnInit } from '@angular/core';
import {async, Observable} from "rxjs";
import {AppointmentService} from "../../shared/appointment.service";
import {Appointment} from "../../shared/appointment.model";
import {CustomerService} from "../../shared/customer.service";
import {Customer} from "../../shared/customer.model";
import {take} from "rxjs/operators";


@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})

export class EmployeeHomeComponent implements OnInit {

  $customers: Observable<Customer[]> | undefined;
  $appointments: Observable<Appointment[]> | undefined;
  customer: Customer | undefined;
  customerId: number = 1;

  showing: string | null | undefined;
  appointment= "appointment";
  customers = "customers";

  constructor(private _appointmentService: AppointmentService, private _customerService: CustomerService) { }

  ngOnInit(): void {
    this.$appointments = this._appointmentService.getAppointments();
    this.$customers =this._customerService.getCustomers();
    this.showing = null;
    this.getCustomerById()
  }
  allCustomers() {
    this.showing = this.customers;
  }

  showingAppointments() {

    this.showing = this.appointment;
  }

  getCustomerById(){
    this._customerService.getCustomerById(this.customerId).subscribe(c => this.customer = c);


    return this.customer;
  }

  setCustomerId(id: number){
    this.customerId = id;
    let name:  string = " ";

    if(this.customer!= null){
      name = this.customer.name
    }
    return name;
  }

}
