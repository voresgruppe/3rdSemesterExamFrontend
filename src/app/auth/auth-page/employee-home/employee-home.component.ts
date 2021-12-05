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
import {AuthService} from "../../../shared/auth.service";
import {Employee} from "../../../shared/employee.model";
import {EmployeeService} from "../../../shared/employee.service";


@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.scss']
})

export class EmployeeHomeComponent implements OnInit {

  $customers: Customer[] | undefined;
  $appointments: Appointment[] | undefined;
  $appointmentsByLoggedEmployee: Appointment[] | undefined;
  $hairstyles: Hairstyle[] | undefined;
  $employees: Employee[] | undefined;

  $loggedEmployee: Employee | undefined;



  showing: string | null | undefined;
  appointments= "appointments";
  customers = "customers";
  hairstyles = "hairstyles";
  addCustomer = "addCustomer";
  myAppointments = "myAppointments";



  customerForm = this._fb.group({
    name: [''],
    phoneNumber: [''],
    email: [''],
  });

  constructor(private _appointmentService: AppointmentService, private _customerService: CustomerService, private _hairstyleService: HairstyleService,
              private _auth: AuthService, private _employeeService: EmployeeService, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this._appointmentService.getAppointments().subscribe(a => this.$appointments = a as Appointment[]);

    this._customerService.getCustomers().subscribe(a => this.$customers = a as Customer[]);
    this._hairstyleService.getHairstyles().subscribe(h=> this.$hairstyles = h as Hairstyle[])
    this._employeeService.getEmployees().subscribe(e=> this.$employees= e as Employee[])
    let employeeId = this._auth.getEmployeeID();
    console.log(employeeId)
    if(employeeId!= 0)
    {
      this._employeeService.getEmployeeById(employeeId).subscribe(e=> this.$loggedEmployee = e);
      this._appointmentService.getAppointmentsByEmployee(employeeId).subscribe(a => this.$appointmentsByLoggedEmployee = a as Appointment[]);
    }


    this.showing = null;
  }
  click_allCustomers() {
    this.showing = this.customers;
  }

  showingAppointments() {

    this.showing = this.appointments;
  }

  getLoggedEmployeeName(){
    let str = "Error";
    if(this.$loggedEmployee?.name){
      str = this.$loggedEmployee.name;
    }
    return str
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

  //TODO hent via API
  getEmployeeNameById(employeeId: number){

    let str = "Error";

    if(this.$employees)
      for(let employee of this.$employees){
        if(employee.id == employeeId){
          str = employee.name
        }
      }

    return str
  }

  click_AddCustomer() {
      this.showing = this.addCustomer
  }


  CreateCustomer() {
    const customer = this.customerForm.value as Customer;
    (this._customerService.createCustomer(customer).subscribe(c => this.$customers?.push(c)));
  }

  click_allHairstyles() {
    this.showing = this.hairstyles;
  }

  showingMyAppointments() {
    this.showing = this.myAppointments;
  }
}
