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
import { FormControl } from '@angular/forms';


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
  $starterStyles: Hairstyle[] | undefined;
  $possibleHairstyles: Hairstyle[] | undefined;
  $chosenHairstyle: Hairstyle | undefined;


  appointmentForm = this._fb.group({
    hairstyleStarterId: [''],
    hairstyleEndId: [''],
    appointmentTime: [''],
    employeeId: [''],
    customerId: ['']
  });

  customerForm = this._fb.group({
    name: [''],
    phoneNumber: [''],
    email: [''],
  });

  syncPhoneNr = new FormControl('')


  constructor(private _fb: FormBuilder, private _customerService: CustomerService, private _hairstyleService: HairstyleService, private _employeeService: EmployeeService,
              private _appointmentService: AppointmentService) { }

  ngOnInit(): void {
    checkPhone_clickedOnce = false;

    this._customerService.getCustomers().subscribe(c=> this.$customers = c)
    this._hairstyleService.getHairstyles().subscribe(h=> this.$hairstyles = h)
    this._employeeService.getEmployees().subscribe(e=> this.$employees =e)
    this._hairstyleService.getHairStyles_StarterStyles().subscribe(h=> this.$starterStyles= h as Hairstyle[])

  }

  getPhoneCheckedOnce(){
    return checkPhone_clickedOnce;
  }



  checkPhone() {
    let phone = (<HTMLInputElement>document.getElementById("phoneNumber")).value.toString()
      .replace(/\s/g, "")               //ja, det set fucked ud men det virker okay
      .replace(/\d{2}(?=.)/g, '$& ');
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

    console.log(appointment)
    let createdAppointment: Appointment | undefined;
    this._appointmentService.createAppointment(appointment).pipe(
      tap(c=>{
        if(c){
          createdAppointment=c;
        }})).subscribe();
  }

  async chooseStarterStyle() {

    const e = document.getElementById('hairstyleStarter') as HTMLSelectElement;
    const id = e.options[e.selectedIndex].value;


    this._hairstyleService.getHairstyle(+id).subscribe(h => this.$chosenHairstyle = h)

    await new Promise(f => setTimeout(f, 300))

    if (this.$chosenHairstyle) {
      this._hairstyleService.getHairstyleFromListOfId(this.$chosenHairstyle.possibleStyles).subscribe(h => this.$possibleHairstyles = h);
    }
  }
}
