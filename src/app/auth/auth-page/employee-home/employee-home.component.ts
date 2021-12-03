import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {AppointmentService} from "../../shared/appointment.service";
import {Appointment} from "../../shared/appointment.model";
import {CustomerService} from "../../shared/customer.service";
import {Customer} from "../../shared/customer.model";


@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})

export class EmployeeHomeComponent implements OnInit {

  $customers: Observable<Customer[]> | undefined;
  $appointments: Observable<Appointment[]> | undefined;
  showing: string | null | undefined;
  appointment= "appointment";
  customers = "customers";

  constructor(private _appointmentService: AppointmentService, private _customerService: CustomerService) { }

  ngOnInit(): void {
    this.$appointments = this._appointmentService.getAppointments();
    this.$customers =this._customerService.getCustomers();
    this.showing = null;
  }
  allCustomers() {
    this.showing = this.customers;
  }

  showingAppointments() {

    this.showing = this.appointment;
  }
}
