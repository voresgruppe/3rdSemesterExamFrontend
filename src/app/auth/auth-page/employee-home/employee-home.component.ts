import { Component, OnInit } from '@angular/core';
import {async, Observable} from "rxjs";
import {AppointmentService} from "../../../shared/appointment.service";
import {Appointment} from "../../../shared/appointment.model";
import {CustomerService} from "../../../shared/customer.service";
import {Customer} from "../../../shared/customer.model";
import {take} from "rxjs/operators";
import {FormBuilder} from "@angular/forms";
import {LoginDto} from "../../../shared/login.dto";
import {Hairstyle} from "../../../shared/hairstyle.model";
import {HairstyleService} from "../../../shared/hairstyle.service";


@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.scss']
})

export class EmployeeHomeComponent implements OnInit {

  $customers: Customer[] | undefined;
  $appointments: Appointment[] | undefined;
  $hairstyles: Hairstyle[] | undefined;


  showing: string | null | undefined;
  appointments= "appointments";
  customers = "customers";
  hairstyles = "hairstyles";
  addCustomer = "addCustomer";



  customerForm = this._fb.group({
    name: [''],
    phoneNumber: [''],
    email: [''],
  });

  constructor(private _appointmentService: AppointmentService, private _customerService: CustomerService, private _hairstyleService: HairstyleService,
              private _fb: FormBuilder) { }

  ngOnInit(): void {
    this._appointmentService.getAppointments().subscribe(a => this.$appointments = a as Appointment[]);
    this._customerService.getCustomers().subscribe(a => this.$customers = a as Customer[]);
    this._hairstyleService.getHairstyles().subscribe(h=> this.$hairstyles = h as Hairstyle[])

    this.showing = null;
  }
  click_allCustomers() {
    this.showing = this.customers;
  }

  showingAppointments() {

    this.showing = this.appointments;
  }


  //TODO hent via API
  getCustomerNameById(customerId: number){

    let str = "Error";

    if(this.$customers)
    for(let customer of this.$customers){
      if(customer.id == customerId){
        str = customer.name
      }
    }

    //forsøg på api, men den laver uendelige fejl
    /*
    let cus = this._customerService.getCustomerById(customerId)
    if(cus){
      cus.subscribe(c=> str = c.name)
    }
     */

    return str
  }

  click_AddCustomer() {
      this.showing = this.addCustomer
  }


  //todo tilføjer først id, når man reloader siden
  CreateCustomer() {
    const customer = this.customerForm.value as Customer;
    if(customer){
      console.log(customer)
    }
    console.log(this._customerService.createCustomer(customer).subscribe(c => this.$customers?.push(customer)));
  }

  click_allHairstyles() {
    this.showing = this.hairstyles;
  }
}
