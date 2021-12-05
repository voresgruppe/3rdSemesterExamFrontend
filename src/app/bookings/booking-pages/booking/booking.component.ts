import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {CustomerService} from "../../../shared/customer.service";
import {Customer} from "../../../shared/customer.model";
import {tap} from "rxjs/operators";
import {Hairstyle} from "../../../shared/hairstyle.model";
import {HairstyleService} from "../../../shared/hairstyle.service";
import {EmployeeService} from "../../../shared/employee.service";
import {Employee} from "../../../shared/employee.model";
import {Appointment} from "../../../shared/appointment.model";
import {AppointmentService} from "../../../shared/appointment.service";


let checkPhone_clickedOnce = false;
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

$customers: Customer[] | undefined;
$loggedCustomer: Customer | undefined;
  $hairstyles: Hairstyle[]| undefined;
  $employees: Employee[] | undefined;


  appointmentForm = this._fb.group({
    hairstyleId: [''],
    appointmentTime: [''],
    employeeId: [''],
    customerId: ['']
  });

  customerForm = this._fb.group({
    name: [''],
    phoneNumber: [''],
    email: [''],
  });


  constructor(private _fb: FormBuilder, private _customerService: CustomerService, private _hairstyleService: HairstyleService, private _employeeService: EmployeeService,
              private _appointmentService: AppointmentService) { }

  ngOnInit(): void {
    checkPhone_clickedOnce = false;

    this._customerService.getCustomers().subscribe(c=> this.$customers = c)
    this._hairstyleService.getHairstyles().subscribe(h=> this.$hairstyles = h)
    this._employeeService.getEmployees().subscribe(e=> this.$employees =e)
  }

  getPhoneCheckedOnce(){
    return checkPhone_clickedOnce;
  }



  checkPhone() {
    let phone = (<HTMLInputElement>document.getElementById("phoneNumber")).value;
    let isCustomerFound = false

    if(this.$customers) {
      for (let c of this.$customers) {
        if(c.phoneNumber == phone){
          this.$loggedCustomer = c;
          isCustomerFound = true;
        }

      }
    }
    if(!isCustomerFound){
      this.$loggedCustomer = undefined;
    }

    if(!checkPhone_clickedOnce){
      checkPhone_clickedOnce = true;
    }
  }

  userAvailable(){
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

  getLoggedCustomerName(){
    if(this.$loggedCustomer){
      return this.$loggedCustomer.name;
    }
    else return "Error";
  }

  getLoggedCustomerId(){
    if(this.$loggedCustomer){
      return this.$loggedCustomer.id.toString();
    }
    else return "0";
  }

  CreateAppointment() {
    const appointment = this.appointmentForm.value as Appointment;
    let createdAppointment: Appointment | undefined;
    this._appointmentService.createAppointment(appointment).pipe(
      tap(c=>{
        if(c){
          createdAppointment=c;
        }})).subscribe();
  }
}
